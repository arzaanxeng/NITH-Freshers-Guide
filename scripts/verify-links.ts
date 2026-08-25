import { allResources } from '../src/data/resources'
import { allDomains } from '../src/data/domains'

interface VerificationReportItem {
  id: string
  title: string
  creator: string
  type: string
  url: string
  status: 'VERIFIED' | 'FALLBACK_USED' | 'FAILED'
  httpStatus?: number
  info?: string
  fallbackUrl?: string
  error?: string
}

async function verifySingleUrl(
  url: string,
  retries = 2
): Promise<{ ok: boolean; status?: number; title?: string; author?: string; error?: string }> {
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (isYouTube) {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)

        const res = await fetch(oembedUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          },
          signal: controller.signal,
        })
        clearTimeout(timeout)

        if (res.ok) {
          const data = await res.json()
          return { ok: true, status: res.status, title: data.title, author: data.author_name }
        } else if (res.status === 404 || res.status === 400) {
          return { ok: false, status: res.status, error: `YouTube returned HTTP ${res.status}` }
        }
      } else {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          signal: controller.signal,
        })
        clearTimeout(timeout)

        if (res.ok || (res.status >= 300 && res.status < 400)) {
          return { ok: true, status: res.status }
        } else if (res.status === 404) {
          return { ok: false, status: res.status, error: `HTTP 404 Not Found` }
        }
      }
    } catch (err: any) {
      if (attempt === retries) {
        return { ok: false, error: err.message || 'Network error' }
      }
      // Wait 1s before retry
      await new Promise((r) => setTimeout(r, 1000))
    }
  }

  return { ok: false, error: 'Max retries reached' }
}

async function runVerification() {
  console.log('\nNITH FRESHER\'S GUIDE')
  console.log('RESOURCE VERIFICATION PIPELINE')
  console.log('──────────────────────────────────────────────────\n')

  const reportItems: VerificationReportItem[] = []

  for (const res of allResources) {
    const primaryCheck = await verifySingleUrl(res.url)

    if (primaryCheck.ok) {
      reportItems.push({
        id: res.id,
        title: res.title,
        creator: res.creator,
        type: res.type,
        url: res.url,
        status: 'VERIFIED',
        httpStatus: primaryCheck.status || 200,
        info: primaryCheck.title ? `"${primaryCheck.title}"` : 'Link Active',
      })
    } else if (res.fallbackUrl) {
      // Test fallback URL
      const fallbackCheck = await verifySingleUrl(res.fallbackUrl)
      if (fallbackCheck.ok) {
        reportItems.push({
          id: res.id,
          title: res.title,
          creator: res.creator,
          type: res.type,
          url: res.url,
          status: 'FALLBACK_USED',
          fallbackUrl: res.fallbackUrl,
          httpStatus: fallbackCheck.status || 200,
          info: `Primary link failed (${primaryCheck.error}). Used fallback: ${res.fallbackUrl}`,
        })
      } else {
        reportItems.push({
          id: res.id,
          title: res.title,
          creator: res.creator,
          type: res.type,
          url: res.url,
          status: 'FAILED',
          error: `Primary (${primaryCheck.error}) & Fallback (${fallbackCheck.error}) failed.`,
        })
      }
    } else {
      reportItems.push({
        id: res.id,
        title: res.title,
        creator: res.creator,
        type: res.type,
        url: res.url,
        status: 'FAILED',
        error: primaryCheck.error || 'Link unavailable',
      })
    }
  }

  // Print Formatted Report
  for (const item of reportItems) {
    if (item.status === 'VERIFIED') {
      console.log(`✓ ${item.creator} — ${item.title}`)
      console.log(`  Type: ${item.type} | Status: VERIFIED (${item.httpStatus})`)
      if (item.info) console.log(`  Detail: ${item.info}`)
    } else if (item.status === 'FALLBACK_USED') {
      console.log(`⚠ ${item.creator} — ${item.title}`)
      console.log(`  Status: FALLBACK USED -> ${item.fallbackUrl}`)
      console.log(`  Detail: ${item.info}`)
    } else {
      console.log(`✗ ${item.creator} — ${item.title}`)
      console.log(`  Status: FAILED | Error: ${item.error}`)
    }
    console.log('──────────────────────────────────────────────────')
  }

  const verifiedCount = reportItems.filter((i) => i.status === 'VERIFIED').length
  const fallbackCount = reportItems.filter((i) => i.status === 'FALLBACK_USED').length
  const failedCount = reportItems.filter((i) => i.status === 'FAILED').length

  console.log('\nFINAL SUMMARY:')
  console.log(`  Verified:   ${verifiedCount}`)
  console.log(`  Fallbacks:  ${fallbackCount}`)
  console.log(`  Failed:     ${failedCount}`)
  console.log('──────────────────────────────────────────────────\n')

  if (failedCount > 0) {
    console.error('🚨 Link verification failed. Fix or replace failed resources.')
    process.exit(1)
  } else {
    console.log('🎉 All resources passed verification!')
    process.exit(0)
  }
}

runVerification()
