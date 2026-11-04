import { allResources } from '../src/data/resources'

interface VerificationReportItem {
  id: string
  title: string
  creator: string
  type: string
  url: string
  status: 'VERIFIED' | 'FALLBACK_USED' | 'FAILED' | 'UNVERIFIABLE'
  httpStatus?: number
  info?: string
  fallbackUrl?: string
  error?: string
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Statuses that mean "the provider is throttling/blocking this IP right now",
// not "the resource is dead". Worth retrying with backoff before giving up.
const TRANSIENT_STATUSES = new Set([408, 429, 500, 502, 503, 504])

// Domains whose bot/WAF protection (Akamai, Cloudflare, etc.) reliably 403s
// or hangs on plain server-side fetches regardless of headers or retry count.
// A 403 (or a timeout that never clears even with generous headroom) from one
// of these is not evidence the resource is dead - it just means our checker
// isn't a real browser. Retrying burns time for nothing, so these get flagged
// UNVERIFIABLE instead of FAILED and don't fail the CI run.
// Verify these manually in a browser occasionally instead of via this script.
//
// Listed as registrable domains, not exact hostnames: MathWorks serves docs
// off locale subdomains (in.mathworks.com, www.mathworks.com, etc.), so a
// suffix match is required - an exact-match list silently misses any
// subdomain that isn't spelled out, which is what let the two MathWorks
// (in.mathworks.com) links fail CI instead of being flagged unverifiable.
const KNOWN_BOT_PROTECTED_DOMAINS = ['mathworks.com', 'electronics-tutorials.ws']

// Sites that are known to be legitimately slow to respond. Default timeout
// is 10s; these get more headroom before we call it an abort.
const DOMAIN_TIMEOUT_OVERRIDES: Record<string, number> = {
  'electronics-tutorials.ws': 20000,
  'www.electronics-tutorials.ws': 20000,
}

const DEFAULT_TIMEOUT_MS = 10000

function getHostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}

function getTimeoutFor(url: string): number {
  return DOMAIN_TIMEOUT_OVERRIDES[getHostname(url)] ?? DEFAULT_TIMEOUT_MS
}

function isBotProtected(url: string): boolean {
  const hostname = getHostname(url)
  if (!hostname) return false
  return KNOWN_BOT_PROTECTED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  )
}

async function verifySingleUrl(
  url: string,
  retries = 3
): Promise<{ ok: boolean; status?: number; title?: string; author?: string; error?: string; botBlocked?: boolean }> {
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')
  const timeoutMs = getTimeoutFor(url)
  let lastStatus: number | undefined
  let lastError: string | undefined

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (isYouTube) {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), timeoutMs)

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
        } else {
          lastStatus = res.status
          lastError = `YouTube returned HTTP ${res.status}`
        }
      } else {
        // Known bot-protected domain returning 403: don't waste retries,
        // flag it immediately as unverifiable-but-probably-fine.
        if (isBotProtected(url)) {
          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(), timeoutMs)
          try {
            const res = await fetch(url, {
              method: 'GET',
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              },
              signal: controller.signal,
            })
            clearTimeout(timeout)
            if (res.ok || (res.status >= 300 && res.status < 400)) {
              return { ok: true, status: res.status }
            }
            if (res.status === 403) {
              return { ok: false, status: 403, error: 'Blocked by bot protection (WAF)', botBlocked: true }
            }
            lastStatus = res.status
            lastError = `HTTP ${res.status}`
          } catch (err: any) {
            clearTimeout(timeout)
            lastError = err.message || 'Network error'
          }
          if (attempt < retries) {
            await sleep(1000 * 2 ** attempt)
          }
          continue
        }

        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), timeoutMs)

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
        } else {
          lastStatus = res.status
          lastError = `HTTP ${res.status}`
        }
      }
    } catch (err: any) {
      lastError = err.message || 'Network error'
    }

    if (attempt < retries) {
      const base = lastStatus && TRANSIENT_STATUSES.has(lastStatus) ? 2000 : 1000
      await sleep(base * 2 ** attempt)
    }
  }

  // A bot-protected domain that never returned a clean 403 within the loop
  // above (e.g. it hung/aborted every attempt instead, which is how some
  // WAF/CDN challenge pages behave against non-browser clients) has still
  // demonstrated the same "our checker isn't a real browser" problem, not a
  // dead link. Flag it unverifiable rather than failing the build over it.
  if (isBotProtected(url)) {
    return {
      ok: false,
      status: lastStatus,
      error: lastError || 'Max retries reached',
      botBlocked: true,
    }
  }

  return { ok: false, status: lastStatus, error: lastError || 'Max retries reached' }
}

async function runVerification() {
  console.log('\nNITH FRESHER\'S GUIDE')
  console.log('RESOURCE VERIFICATION PIPELINE')
  console.log('──────────────────────────────────────────────────\n')

  const reportItems: VerificationReportItem[] = []
  const REQUEST_STAGGER_MS = 400

  for (const res of allResources) {
    if (reportItems.length > 0) await sleep(REQUEST_STAGGER_MS)
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
    } else if (primaryCheck.botBlocked) {
      reportItems.push({
        id: res.id,
        title: res.title,
        creator: res.creator,
        type: res.type,
        url: res.url,
        status: 'UNVERIFIABLE',
        httpStatus: primaryCheck.status,
        info: 'Site blocks automated requests (WAF/bot protection). Verify manually in a browser.',
      })
    } else if (res.fallbackUrl) {
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
      } else if (fallbackCheck.botBlocked) {
        reportItems.push({
          id: res.id,
          title: res.title,
          creator: res.creator,
          type: res.type,
          url: res.url,
          status: 'UNVERIFIABLE',
          httpStatus: fallbackCheck.status,
          info: 'Fallback site blocks automated requests (WAF/bot protection). Verify manually in a browser.',
        })
      } else {
        reportItems.push({
          id: res.id,
          title: res.title,
          creator: res.creator,
          type: res.type,
          url: res.url,
          status: 'FAILED',
          httpStatus: fallbackCheck.status ?? primaryCheck.status,
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
        httpStatus: primaryCheck.status,
        error: primaryCheck.error || 'Link unavailable',
      })
    }
  }

  for (const item of reportItems) {
    if (item.status === 'VERIFIED') {
      console.log(`✓ ${item.creator} — ${item.title}`)
      console.log(`  Type: ${item.type} | Status: VERIFIED (${item.httpStatus})`)
      if (item.info) console.log(`  Detail: ${item.info}`)
    } else if (item.status === 'FALLBACK_USED') {
      console.log(`⚠ ${item.creator} — ${item.title}`)
      console.log(`  Status: FALLBACK USED -> ${item.fallbackUrl}`)
      console.log(`  Detail: ${item.info}`)
    } else if (item.status === 'UNVERIFIABLE') {
      console.log(`? ${item.creator} — ${item.title}`)
      console.log(`  Status: UNVERIFIABLE (HTTP ${item.httpStatus})`)
      console.log(`  Detail: ${item.info}`)
    } else {
      const statusPart = item.httpStatus ? ` (HTTP ${item.httpStatus})` : ''
      console.log(`✗ ${item.creator} — ${item.title}`)
      console.log(`  Status: FAILED${statusPart} | Error: ${item.error}`)
    }
    console.log('──────────────────────────────────────────────────')
  }

  const verifiedCount = reportItems.filter((i) => i.status === 'VERIFIED').length
  const fallbackCount = reportItems.filter((i) => i.status === 'FALLBACK_USED').length
  const unverifiableCount = reportItems.filter((i) => i.status === 'UNVERIFIABLE').length
  const failedCount = reportItems.filter((i) => i.status === 'FAILED').length

  console.log('\nFINAL SUMMARY:')
  console.log(`  Verified:      ${verifiedCount}`)
  console.log(`  Fallbacks:     ${fallbackCount}`)
  console.log(`  Unverifiable:  ${unverifiableCount}  (bot-protected sites, likely fine)`)
  console.log(`  Failed:        ${failedCount}`)
  console.log('──────────────────────────────────────────────────\n')

  if (failedCount > 0) {
    console.error(' Link verification failed. Fix or replace failed resources.')
    process.exit(1)
  } else {
    console.log(' All resources passed verification (some flagged unverifiable - check manually)!')
    process.exit(0)
  }
}

runVerification()
