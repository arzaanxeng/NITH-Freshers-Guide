import { useState, useEffect, useRef } from 'react'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { SearchModal } from './components/common/SearchModal'
import { BackToTop } from './components/common/BackToTop'

import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { DomainDetailPage } from './pages/DomainDetailPage'
import { RoadmapsPage } from './pages/RoadmapsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ChecklistsPage } from './pages/ChecklistsPage'
import { RealityCheckPage } from './pages/RealityCheckPage'
import { NithEcosystemPage } from './pages/NithEcosystemPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { allDomains } from './data/domains'
import { SITE_URL } from './data/config'

const KNOWN_PATHS = ['/', '/explore', '/roadmaps', '/resources', '/checklists', '/reality-check', '/nith-ecosystem']

const PAGE_TITLES: Record<string, string> = {
  '/': "NITH Fresher's Guide · Honest Technical Maps & Curated Resources",
  '/explore': "Explore Domains · NITH Fresher's Guide",
  '/roadmaps': "Goal-Based Roadmaps · NITH Fresher's Guide",
  '/resources': "Curated Resources · NITH Fresher's Guide",
  '/checklists': "First-Year Flowchart · NITH Fresher's Guide",
  '/reality-check': "Reality Check · NITH Fresher's Guide",
  '/nith-ecosystem': "NITH Ecosystem · NITH Fresher's Guide",
  '/not-found': "Page not found · NITH Fresher's Guide",
}

interface RouteState {
  currentPath: string
  selectedDomainId: string
  search: string
  hash: string
}

// decodeURIComponent throws a URIError on malformed escapes such as
// "/domain/%E0%A4%A". Called while the first state is computed, that used to
// crash the whole app into a blank page, so decode defensively.
const safeDecode = (value: string): string | null => {
  try {
    return decodeURIComponent(value)
  } catch {
    return null
  }
}

const NOT_FOUND: RouteState = { currentPath: '/not-found', selectedDomainId: '', search: '', hash: '' }

// Turns the browser URL into route state. Unknown pages, empty/malformed
// domain ids and unknown domain ids resolve to a real "not found" state
// instead of silently showing the Home page under the wrong URL.
const parseLocation = (pathname: string, search = '', hash = ''): RouteState => {
  // '/explore/' and '/explore' are the same page
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean.startsWith('/domain/')) {
    const id = safeDecode(clean.replace('/domain/', '').split('/')[0])
    if (!id) return NOT_FOUND
    return { currentPath: '/domain', selectedDomainId: id, search, hash }
  }
  if (KNOWN_PATHS.includes(clean)) {
    return { currentPath: clean, selectedDomainId: '', search, hash }
  }
  return NOT_FOUND
}

export function App() {
  const [route, setRoute] = useState<RouteState>(() =>
    parseLocation(window.location.pathname, window.location.search, window.location.hash),
  )
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const mainRef = useRef<HTMLElement>(null)
  const prevPageKey = useRef<string | null>(null)
  const prevHash = useRef<string>('')

  const { currentPath, selectedDomainId, search, hash } = route

  // Global Cmd/Ctrl+K toggles search; "/" opens it when not typing.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
        return
      }
      const t = e.target as HTMLElement | null
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation(window.location.pathname, window.location.search, window.location.hash))
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin)
    // Keep the #hash: it used to be dropped, so links like "/explore#web"
    // landed on the page but never reached the section.
    const next = `${url.pathname}${url.search}${url.hash}`
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (current !== next) {
      window.history.pushState({}, '', next)
    }
    setRoute(parseLocation(url.pathname, url.search, url.hash))
  }

  // Real <a href> links work with middle-click / "open in new tab" / copy
  // link; plain left-clicks on same-site links are handled in-app here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest?.('a')
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Title + canonical per page. Unknown domains and the 404 page must not
  // get a canonical URL: it used to point at "/domain/<bad-id>", or stay
  // stuck on whatever page the visitor came from.
  useEffect(() => {
    let title = PAGE_TITLES[currentPath] ?? PAGE_TITLES['/']
    let canonicalPath: string | null = currentPath
    if (currentPath === '/domain') {
      const domain = allDomains.find((d) => d.id === selectedDomainId)
      title = domain ? `${domain.name} · NITH Fresher's Guide` : PAGE_TITLES['/not-found']
      canonicalPath = domain ? `/domain/${encodeURIComponent(domain.id)}` : null
    } else if (currentPath === '/not-found') {
      canonicalPath = null
    }
    document.title = title
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      if (canonicalPath) canonical.href = `${SITE_URL.replace(/\/+$/, '')}${canonicalPath}`
      else canonical.removeAttribute('href')
    }
  }, [currentPath, selectedDomainId])

  // On page change: jump to top (instantly — a long smooth scroll back up is
  // disorienting) and move focus to <main> so keyboard / screen-reader users
  // start at the new page. If the URL has a #hash, scroll to that element.
  //
  // Previous values live in refs (not a "first render" flag): React
  // StrictMode runs effects twice in development, and the flag version
  // treated that second run as a navigation and stole focus on page load.
  const pageKey = `${currentPath}:${selectedDomainId}`
  useEffect(() => {
    const isInitial = prevPageKey.current === null
    const pageChanged = !isInitial && prevPageKey.current !== pageKey
    const hashChanged = prevHash.current !== hash
    prevPageKey.current = pageKey
    prevHash.current = hash

    const id = hash ? safeDecode(hash.slice(1)) : null
    const target = id ? document.getElementById(id) : null

    if (isInitial) {
      target?.scrollIntoView()
      return
    }
    if (!pageChanged && !hashChanged) return

    if (target) target.scrollIntoView()
    else if (pageChanged) window.scrollTo({ top: 0, behavior: 'auto' })
    if (pageChanged) mainRef.current?.focus({ preventScroll: true })
  }, [pageKey, hash])

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />
      case '/explore':
        return <ExplorePage />
      case '/domain':
        return <DomainDetailPage domainId={selectedDomainId} />
      case '/roadmaps':
        // key: a search-result link to ?roadmap=x re-selects the right tab
        return <RoadmapsPage key={search} />
      case '/resources':
        return <ResourcesPage />
      case '/checklists':
        return <ChecklistsPage />
      case '/reality-check':
        return <RealityCheckPage />
      case '/nith-ecosystem':
        return <NithEcosystemPage />
      default:
        return <NotFoundPage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); mainRef.current?.focus() }}>
        Skip to content
      </a>

      <Navbar currentPath={currentPath} onOpenSearch={() => setSearchOpen(true)} />

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-grow outline-none">
        {renderCurrentPage()}
      </main>

      <Footer />
      <BackToTop />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigate} />
    </div>
  )
}

export default App
