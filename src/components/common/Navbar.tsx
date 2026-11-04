import React, { useEffect, useState } from 'react'
import { Search, Menu, X, BookOpen, Compass, Map, ShieldAlert, Users, Workflow, Star, Home } from 'lucide-react'
import { SITE_CONFIG } from '../../data/config'

interface NavbarProps {
  currentPath: string
  onOpenSearch: () => void
}

type TextSize = 'base' | 'lg' | 'xl'
const TEXT_SIZES: { id: TextSize; label: string }[] = [
  { id: 'base', label: 'Normal' },
  { id: 'lg', label: 'Large' },
  { id: 'xl', label: 'Extra large' },
]
const TEXT_SIZE_KEY = 'nith_guide_text_size_v1'

const readStoredSize = (): TextSize => {
  try {
    const v = localStorage.getItem(TEXT_SIZE_KEY)
    return v === 'lg' || v === 'xl' ? v : 'base'
  } catch {
    return 'base'
  }
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [textSize, setTextSize] = useState<TextSize>(readStoredSize)

  // Apply + persist the reader's chosen text size
  useEffect(() => {
    if (textSize === 'base') document.documentElement.removeAttribute('data-text-size')
    else document.documentElement.setAttribute('data-text-size', textSize)
    try {
      localStorage.setItem(TEXT_SIZE_KEY, textSize)
    } catch {
      /* private mode: setting just won't persist */
    }
  }, [textSize])

  const cycleTextSize = () => {
    const i = TEXT_SIZES.findIndex((s) => s.id === textSize)
    setTextSize(TEXT_SIZES[(i + 1) % TEXT_SIZES.length].id)
  }
  const sizeLabel = TEXT_SIZES.find((s) => s.id === textSize)!.label

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  // …and close it whenever the page changes
  const [lastPath, setLastPath] = useState(currentPath)
  if (lastPath !== currentPath) {
    setLastPath(currentPath)
    setMobileMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Roadmaps', path: '/roadmaps', icon: Map },
    { label: 'Resources', path: '/resources', icon: BookOpen },
    { label: 'Flowchart', path: '/checklists', icon: Workflow },
    { label: 'NITH', path: '/nith-ecosystem', icon: Users },
  ]

  // A domain detail page belongs to "Explore"
  const isActive = (path: string) =>
    currentPath === path || (path === '/explore' && currentPath === '/domain')

  return (
    <header className="no-print sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#D8D0C2] w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-2 min-w-0">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-left group flex-shrink min-w-0">
          <div className="w-8 h-8 rounded bg-[#171717] text-[#FF4D94] font-display font-bold flex items-center justify-center text-base border border-[#171717] group-hover:bg-[#D9206E] group-hover:text-[#FFFDF8] transition-colors flex-shrink-0">
            N
          </div>
          <div className="min-w-0 truncate">
            <span className="font-display font-bold text-sm tracking-tight text-[#171717] block leading-none truncate">
              NITH Fresher's Guide
            </span>
            <span className="font-mono text-[11px] uppercase text-[#625E56] tracking-wider hidden sm:block mt-0.5 truncate">
              Technical Map & Resources
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-1 flex-shrink-0">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide transition-all ${
                isActive(item.path)
                  ? 'bg-[#171717] text-[#FFFDF8]'
                  : 'text-[#4B4A46] hover:text-[#171717] hover:bg-[#EEE9DE]'
              }`}
            >
              {item.label}
            </a>
          ))}

          <a
            href="/reality-check"
            aria-current={currentPath === '/reality-check' ? 'page' : undefined}
            className={`px-3 py-1.5 rounded-md text-sm font-mono font-bold tracking-wide transition-all ml-1 border ${
              currentPath === '/reality-check'
                ? 'bg-[#D9206E] text-[#FFFDF8] border-[#D9206E]'
                : 'bg-[#FDF0F5] text-[#C21A62] border-[#FCD4E2] hover:bg-[#D9206E] hover:text-[#FFFDF8]'
            }`}
          >
            Reality Check
          </a>
        </nav>

        {/* Search, text size, GitHub & mobile menu */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-mono text-[#4B4A46] bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg hover:border-[#171717] hover:text-[#171717] transition-all flex-shrink-0"
            aria-label={`Search guide (${isMac ? 'Command' : 'Control'} + K, or press /)`}
          >
            <Search className="w-4 h-4 text-[#625E56] flex-shrink-0" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[11px] font-mono font-semibold bg-[#FFFDF8] border border-[#D8D0C2] rounded text-[#625E56] flex-shrink-0">
              {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>

          <button
            onClick={cycleTextSize}
            className="px-2.5 py-1.5 text-sm font-bold text-[#4B4A46] bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg hover:border-[#171717] hover:text-[#171717] transition-all flex-shrink-0 leading-none"
            aria-label={`Text size: ${sizeLabel}. Activate to change.`}
            title={`Text size: ${sizeLabel} (click to change)`}
          >
            <span className="text-xs">A</span>
            <span className="text-base">A</span>
          </button>

          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-mono font-bold text-[#171717] bg-[#FEF8EC] hover:bg-[#171717] hover:text-[#FFFDF8] border border-[#FDE6B8] hover:border-[#171717] rounded-lg transition-all flex-shrink-0"
            title="Star repository on GitHub"
          >
            <Star className="w-4 h-4 text-[#B45309] fill-[#B45309] flex-shrink-0" />
            <span>Star Repo</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4B4A46] hover:text-[#171717] rounded-lg hover:bg-[#EEE9DE] flex-shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (scrolls if taller than the screen) */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden bg-[#FFFDF8] border-b border-[#D8D0C2] px-4 py-3 space-y-1 max-h-[calc(100vh-3.75rem)] overflow-y-auto"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.path}
                href={item.path}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'text-[#4B4A46] hover:bg-[#EEE9DE] hover:text-[#171717]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            )
          })}
          <a
            href="/reality-check"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono font-bold bg-[#FDF0F5] text-[#C21A62] border border-[#FCD4E2]"
          >
            <ShieldAlert className="w-4 h-4" />
            Senior Reality Check
          </a>
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono font-bold bg-[#FEF8EC] text-[#B45309] border border-[#FDE6B8]"
          >
            <Star className="w-4 h-4 fill-[#B45309]" />
            Star on GitHub
          </a>
        </nav>
      )}
    </header>
  )
}
