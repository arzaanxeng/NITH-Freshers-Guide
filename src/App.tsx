import React, { useState, useEffect } from 'react'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { SearchModal } from './components/common/SearchModal'

import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { DomainDetailPage } from './pages/DomainDetailPage'
import { RoadmapsPage } from './pages/RoadmapsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ChecklistsPage } from './pages/ChecklistsPage'
import { RealityCheckPage } from './pages/RealityCheckPage'
import { NithEcosystemPage } from './pages/NithEcosystemPage'
import { allDomains } from './data/domains'

const KNOWN_PATHS = ['/', '/explore', '/roadmaps', '/resources', '/checklists', '/reality-check', '/nith-ecosystem']
const DEFAULT_DOMAIN_ID = 'ai-ml'

const PAGE_TITLES: Record<string, string> = {
  '/': "NITH Fresher's Guide · Honest Technical Maps & Curated Resources",
  '/explore': "Explore Domains · NITH Fresher's Guide",
  '/roadmaps': "Goal-Based Roadmaps · NITH Fresher's Guide",
  '/resources': "Curated Resources · NITH Fresher's Guide",
  '/checklists': "First-Year Flowchart · NITH Fresher's Guide",
  '/reality-check': "Reality Check · NITH Fresher's Guide",
  '/nith-ecosystem': "NITH Ecosystem · NITH Fresher's Guide",
}

// Reads the current browser URL and turns it into in-app route state.
// Falls back to home for anything unrecognized so a bad/old link never
// shows a blank page.
const parseLocation = (pathname: string): { currentPath: string; selectedDomainId: string } => {
  if (pathname.startsWith('/domain/')) {
    const id = pathname.replace('/domain/', '').split('/')[0]
    const exists = allDomains.some((d) => d.id === id)
    return { currentPath: '/domain', selectedDomainId: exists ? id : DEFAULT_DOMAIN_ID }
  }
  if (KNOWN_PATHS.includes(pathname)) {
    return { currentPath: pathname, selectedDomainId: DEFAULT_DOMAIN_ID }
  }
  return { currentPath: '/', selectedDomainId: DEFAULT_DOMAIN_ID }
}

const urlFor = (path: string, domainId: string): string => (path === '/domain' ? `/domain/${domainId}` : path)

export function App() {
  const initial = parseLocation(window.location.pathname)
  const [currentPath, setCurrentPath] = useState<string>(initial.currentPath)
  const [selectedDomainId, setSelectedDomainId] = useState<string>(initial.selectedDomainId)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  // Global Command-K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Support the browser back/forward buttons instead of trapping
  // navigation entirely inside React state
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocation(window.location.pathname)
      setCurrentPath(parsed.currentPath)
      setSelectedDomainId(parsed.selectedDomainId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Keep the tab title (and therefore browser history entries + shared
  // links) in sync with whatever page is actually showing
  useEffect(() => {
    if (currentPath === '/domain') {
      const domain = allDomains.find((d) => d.id === selectedDomainId)
      document.title = domain ? `${domain.name} · NITH Fresher's Guide` : PAGE_TITLES['/']
    } else {
      document.title = PAGE_TITLES[currentPath] ?? PAGE_TITLES['/']
    }
  }, [currentPath, selectedDomainId])

  const handleNavigate = (path: string) => {
    const nextDomainId = path.startsWith('/domain/') ? path.replace('/domain/', '') : selectedDomainId
    const nextPath = path.startsWith('/domain/') ? '/domain' : path
    const url = urlFor(nextPath, nextDomainId)

    if (window.location.pathname !== url) {
      window.history.pushState({}, '', url)
    }
    setSelectedDomainId(nextDomainId)
    setCurrentPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectDomain = (id: string) => {
    const url = urlFor('/domain', id)
    if (window.location.pathname !== url) {
      window.history.pushState({}, '', url)
    }
    setSelectedDomainId(id)
    setCurrentPath('/domain')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />
      case '/explore':
        return <ExplorePage onSelectDomain={handleSelectDomain} />
      case '/domain':
        return (
          <DomainDetailPage
            domainId={selectedDomainId}
            onBack={() => handleNavigate('/explore')}
            onNavigate={handleNavigate}
          />
        )
      case '/roadmaps':
        return <RoadmapsPage onNavigate={handleNavigate} />
      case '/resources':
        return <ResourcesPage />
      case '/checklists':
        return <ChecklistsPage />
      case '/reality-check':
        return <RealityCheckPage />
      case '/nith-ecosystem':
        return <NithEcosystemPage />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-[#111827]">
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}

export default App
