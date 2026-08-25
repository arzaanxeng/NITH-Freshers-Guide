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

export function App() {
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ai-ml')
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

  const handleNavigate = (path: string) => {
    if (path.startsWith('/domain/')) {
      const id = path.replace('/domain/', '')
      setSelectedDomainId(id)
      setCurrentPath('/domain')
    } else {
      setCurrentPath(path)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectDomain = (id: string) => {
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
