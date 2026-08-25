import React, { useState, useEffect, useRef } from 'react'
import { Search, X, ExternalLink, ArrowRight, BookOpen, Compass, Map, Users } from 'lucide-react'
import { searchAllItems, SearchResultItem } from '../../utils/search'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (path: string) => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const results = searchAllItems(query)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results.length > 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex])
      }
    }
  }

  const handleSelect = (item: SearchResultItem) => {
    onClose()
    if (item.category === 'resource') {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    } else {
      onNavigate(item.url)
    }
  }

  if (!isOpen) return null

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'domain':
        return <Compass className="w-4 h-4 text-[#D9206E]" />
      case 'resource':
        return <BookOpen className="w-4 h-4 text-[#087F73]" />
      case 'roadmap':
        return <Map className="w-4 h-4 text-[#2856B6]" />
      case 'nith':
        return <Users className="w-4 h-4 text-[#D97706]" />
      default:
        return <Search className="w-4 h-4 text-[#77736B]" />
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search guide"
    >
      <div
        className="w-full max-w-2xl bg-[#FFFDF8] rounded-xl border border-[#171717] card-level-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#D8D0C2] bg-[#FFFDF8]">
          <Search className="w-5 h-5 text-[#77736B] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search domains (React, ESP32, AI), creators (CampusX), NITH teams (Ojas)..."
            className="w-full py-4 text-base bg-transparent font-sans placeholder-[#77736B] focus:outline-none text-[#171717]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#77736B] hover:text-[#171717] hover:bg-[#EEE9DE]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-[#77736B] text-sm">
              <p className="font-mono text-xs text-[#77736B] mb-2 uppercase tracking-wider">Quick Suggestions</p>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['CampusX', 'ESP32', 'React', 'DSA', 'Nimbus', 'Verilog', 'App Team'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 text-xs font-mono bg-[#EEE9DE] hover:bg-[#171717] hover:text-[#FFFDF8] rounded-md border border-[#D8D0C2] transition-all text-[#4B4A46]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-[#77736B]">
              <p className="font-medium text-sm">No results matching "{query}"</p>
              <p className="text-xs text-[#77736B] mt-1">Try searching for a technology, domain, creator, or NITH club name.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={`${item.category}-${item.id}-${idx}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                      isSelected ? 'bg-[#171717] text-[#FFFDF8]' : 'hover:bg-[#EEE9DE] text-[#171717]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5">{getCategoryIcon(item.category)}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm tracking-tight truncate">{item.title}</span>
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-mono uppercase rounded font-bold ${
                              isSelected
                                ? 'bg-[#D9206E] text-[#FFFDF8]'
                                : 'bg-[#EEE9DE] text-[#4B4A46]'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-[#EEE9DE]' : 'text-[#77736B]'}`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {item.category === 'resource' ? (
                        <ExternalLink className={`w-4 h-4 ${isSelected ? 'text-[#D9206E]' : 'text-[#77736B]'}`} />
                      ) : (
                        <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-[#D9206E]' : 'text-[#77736B]'}`} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts indicator */}
        <div className="px-4 py-2 bg-[#EEE9DE] border-t border-[#D8D0C2] flex items-center justify-between text-[11px] font-mono text-[#77736B]">
          <span>
            Use <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">↑</kbd>{' '}
            <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">↓</kbd> to navigate
          </span>
          <span>
            Press <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">↵</kbd> to select
          </span>
          <span>
            Press <kbd className="px-1 py-0.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  )
}
