import React, { useState } from 'react'
import { Search, Menu, X, BookOpen, Compass, Map, ShieldAlert, Users, Workflow, Star } from 'lucide-react'
import { SITE_CONFIG } from '../../data/config'

interface NavbarProps {
  currentPath: string
  onNavigate: (path: string) => void
  onOpenSearch: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', path: '/', icon: BookOpen },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Roadmaps', path: '/roadmaps', icon: Map },
    { label: 'Resources', path: '/resources', icon: BookOpen },
    { label: 'Flowchart', path: '/checklists', icon: Workflow },
    { label: 'NITH', path: '/nith-ecosystem', icon: Users },
  ]

  const handleNavClick = (path: string) => {
    onNavigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#D8D0C2] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-2 min-w-0">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2 text-left group focus-visible:outline-none flex-shrink min-w-0"
        >
          <div className="w-8 h-8 rounded bg-[#171717] text-[#D9206E] font-display font-bold flex items-center justify-center text-base border border-[#171717] group-hover:bg-[#D9206E] group-hover:text-[#FFFDF8] transition-colors flex-shrink-0">
            N
          </div>
          <div className="min-w-0 truncate">
            <span className="font-display font-bold text-sm tracking-tight text-[#171717] block leading-none truncate">
              NITH Fresher's Guide
            </span>
            <span className="font-mono text-[10px] uppercase text-[#77736B] tracking-wider hidden sm:block mt-0.5 truncate">
              Technical Map & Resources
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path))
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'text-[#4B4A46] hover:text-[#171717] hover:bg-[#EEE9DE]'
                }`}
              >
                {item.label}
              </button>
            )
          })}

          {/* Special Reality Check Link */}
          <button
            onClick={() => handleNavClick('/reality-check')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wide transition-all ml-1 border ${
              currentPath === '/reality-check'
                ? 'bg-[#D9206E] text-[#FFFDF8] border-[#D9206E]'
                : 'bg-[#FDF0F5] text-[#D9206E] border-[#FCD4E2] hover:bg-[#D9206E] hover:text-[#FFFDF8]'
            }`}
          >
            Reality Check
          </button>
        </nav>

        {/* Command-K Search, Star on GitHub & Mobile Menu Button */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-[#4B4A46] bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg hover:border-[#171717] hover:text-[#171717] transition-all flex-shrink-0"
            aria-label="Search guide (Command + K)"
          >
            <Search className="w-3.5 h-3.5 text-[#77736B] flex-shrink-0" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#FFFDF8] border border-[#D8D0C2] rounded text-[#77736B] flex-shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Star Repository Link */}
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold text-[#171717] bg-[#FEF8EC] hover:bg-[#171717] hover:text-[#FFFDF8] border border-[#FDE6B8] hover:border-[#171717] rounded-lg transition-all flex-shrink-0"
            title="Star repository on GitHub"
          >
            <Star className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706] flex-shrink-0" />
            <span className="hidden sm:inline">Star Repo</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4B4A46] hover:text-[#171717] rounded-lg hover:bg-[#EEE9DE] flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF8] border-b border-[#D8D0C2] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path))
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'text-[#4B4A46] hover:bg-[#EEE9DE] hover:text-[#171717]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
          <button
            onClick={() => handleNavClick('/reality-check')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono font-bold bg-[#FDF0F5] text-[#D9206E] border border-[#FCD4E2]"
          >
            <ShieldAlert className="w-4 h-4" />
            Senior Reality Check
          </button>
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono font-bold bg-[#FEF8EC] text-[#D97706] border border-[#FDE6B8]"
          >
            <Star className="w-4 h-4 fill-[#D97706]" />
            Star on GitHub (NITH-Freshers-Guide)
          </a>
        </div>
      )}
    </header>
  )
}
