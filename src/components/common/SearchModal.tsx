import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, ExternalLink, ArrowRight, BookOpen, Compass, Map, Users } from 'lucide-react'
import { searchAllItems, SearchResultItem } from '../../utils/search'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (path: string) => void
}

const CATEGORY_LABEL: Record<SearchResultItem['category'], string> = {
  domain: 'domain',
  resource: 'resource',
  roadmap: 'roadmap',
  nith: 'nith',
}

const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case 'domain':
      return <Compass className="w-4 h-4 text-[#D9206E]" />
    case 'resource':
      return <BookOpen className="w-4 h-4 text-[#087F73]" />
    case 'roadmap':
      return <Map className="w-4 h-4 text-[#2856B6]" />
    case 'nith':
      return <Users className="w-4 h-4 text-[#B45309]" />
    default:
      return <Search className="w-4 h-4 text-[#625E56]" />
  }
}

// The dialog only exists while open, so its state (query, selection) resets
// naturally on every open — no reset-in-effect needed.
export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null
  return <SearchDialog onClose={onClose} onNavigate={onNavigate} />
}

const SearchDialog: React.FC<Omit<SearchModalProps, 'isOpen'>> = ({ onClose, onNavigate }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const results = useMemo(() => searchAllItems(query), [query])
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus the input, lock page scroll, and restore focus to whatever
  // opened the dialog when it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  // Escape closes from anywhere; Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button, input, [href], [tabindex]:not([tabindex="-1"])')
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Keep the highlighted result visible when arrowing through a long list
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  const handleSelect = (item: SearchResultItem) => {
    onClose()
    if (item.category === 'resource') {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    } else {
      onNavigate(item.url)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) handleSelect(results[selectedIndex])
    }
  }

  const updateQuery = (value: string) => {
    setQuery(value)
    setSelectedIndex(0)
  }

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search guide"
        className="w-full max-w-2xl bg-[#FFFDF8] rounded-xl border border-[#171717] card-level-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#D8D0C2] bg-[#FFFDF8]">
          <Search className="w-5 h-5 text-[#625E56] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results.length > 0 ? `search-option-${selectedIndex}` : undefined}
            aria-autocomplete="list"
            aria-label="Search the guide"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search domains, creators, NITH teams (React, ESP32, CampusX, Ojas)…"
            className="w-full py-4 text-base bg-transparent font-sans placeholder-[#625E56] focus:outline-none text-[#171717]"
          />
          {query && (
            <button
              onClick={() => {
                updateQuery('')
                inputRef.current?.focus()
              }}
              className="px-2 py-1 mr-1 rounded-md text-xs font-mono text-[#625E56] hover:text-[#171717] hover:bg-[#EEE9DE]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#625E56] hover:text-[#171717] hover:bg-[#EEE9DE]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] sm:max-h-96 overflow-y-auto p-2">
          <p className="sr-only" aria-live="polite">
            {query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : ''}
          </p>

          {query.trim() === '' ? (
            <div className="p-6 text-center text-[#625E56] text-sm">
              <p className="font-mono text-xs text-[#625E56] mb-2 uppercase tracking-wider">Quick Suggestions</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['CampusX', 'ESP32', 'React', 'DSA', 'Nimbus', 'Verilog', 'App Team'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      updateQuery(term)
                      inputRef.current?.focus()
                    }}
                    className="px-3 py-1.5 text-sm font-mono bg-[#EEE9DE] hover:bg-[#171717] hover:text-[#FFFDF8] rounded-md border border-[#D8D0C2] transition-all text-[#4B4A46]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-[#625E56]">
              <p className="font-medium text-base">No results matching "{query}"</p>
              <p className="text-sm mt-1">Try a technology, domain, creator, or NITH club name.</p>
            </div>
          ) : (
            <div id="search-results" role="listbox" aria-label="Search results" className="space-y-1">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <div
                    key={`${item.category}-${item.id}`}
                    id={`search-option-${idx}`}
                    role="option"
                    aria-selected={isSelected}
                    data-index={idx}
                    onClick={() => handleSelect(item)}
                    onMouseMove={() => !isSelected && setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#171717] text-[#FFFDF8]' : 'hover:bg-[#EEE9DE] text-[#171717]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5">{getCategoryIcon(item.category)}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm tracking-tight truncate">{item.title}</span>
                          <span
                            className={`px-1.5 py-0.5 text-[11px] font-mono uppercase rounded font-bold flex-shrink-0 ${
                              isSelected ? 'bg-[#D9206E] text-[#FFFDF8]' : 'bg-[#EEE9DE] text-[#4B4A46]'
                            }`}
                          >
                            {CATEGORY_LABEL[item.category]}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-[#EEE9DE]' : 'text-[#625E56]'}`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {item.category === 'resource' ? (
                        <ExternalLink className={`w-4 h-4 ${isSelected ? 'text-[#FF4D94]' : 'text-[#625E56]'}`} />
                      ) : (
                        <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#FF4D94]' : 'text-[#625E56]'}`} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Shortcut hints (hidden on touch-width screens) */}
        <div className="hidden sm:flex px-4 py-2 bg-[#EEE9DE] border-t border-[#D8D0C2] items-center justify-between text-xs font-mono text-[#625E56]">
          <span>
            <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">↑</kbd>{' '}
            <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">↓</kbd> navigate
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">↵</kbd> open
          </span>
          <span>
            <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">Esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}
