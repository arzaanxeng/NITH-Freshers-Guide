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
}

// Turns the browser URL into route state. Unknown pages and unknown domain
// ids now resolve to a real "not found" state instead of silently showing
// the Home page / the AI-ML domain under the wrong URL.
const parseLocation = (pathname: string, search = ''): RouteState => {
  // '/explore/' and '/explore' are the same page
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (clean.startsWith('/domain/')) {
    const id = decodeURIComponent(clean.replace('/domain/', '').split('/')[0])
    return { currentPath: '/domain', selectedDomainId: id, search }
  }
  if (KNOWN_PATHS.includes(clean)) {
    return { currentPath: clean, selectedDomainId: '', search }
  }
  return { currentPath: '/not-found', selectedDomainId: '', search: '' }
}

export function App() {
  const [route, setRoute] = useState<RouteState>(() =>
    parseLocation(window.location.pathname, window.location.search),
  )
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  const { currentPath, selectedDomainId, search } = route

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
      setRoute(parseLocation(window.location.pathname, window.location.search))
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin)
    const next = `${url.pathname}${url.search}`
    if (`${window.location.pathname}${window.location.search}` !== next) {
      window.history.pushState({}, '', next)
    }
    setRoute(parseLocation(url.pathname, url.search))
  }

  // Real <a href> links work with middle-click / "open in new tab" / copy
  // link; plain left-clicks on same-site links are handled in-app here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement | null)?.closest?.('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Title + canonical per page (the canonical used to point every page at
  // the home page, which tells search engines they're all duplicates).
  useEffect(() => {
    let title = PAGE_TITLES[currentPath] ?? PAGE_TITLES['/']
    let canonicalPath = currentPath
    if (currentPath === '/domain') {
      const domain = allDomains.find((d) => d.id === selectedDomainId)
      title = domain ? `${domain.name} · NITH Fresher's Guide` : PAGE_TITLES['/not-found']
      canonicalPath = `/domain/${selectedDomainId}`
    }
    document.title = title
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical && currentPath !== '/not-found') canonical.href = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`
  }, [currentPath, selectedDomainId])

  // On route change: jump to top (instantly — a long smooth scroll back up
  // is disorienting) and move focus to <main> so keyboard / screen-reader
  // users start at the new page instead of on a button that no longer exists.
  const pathKey = `${currentPath}:${selectedDomainId}`
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathKey])

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
