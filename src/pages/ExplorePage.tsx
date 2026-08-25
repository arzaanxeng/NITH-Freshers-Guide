import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { allDomains } from '../data/domains'
import { DomainCard } from '../components/cards/DomainCard'

interface ExplorePageProps {
  onSelectDomain: (id: string) => void
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onSelectDomain }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredDomains = allDomains.filter((domain) => {
    const matchesCategory = selectedCategory === 'all' || domain.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || domain.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    const matchesSearch =
      searchQuery === '' ||
      domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.coreTechnologies.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesDifficulty && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="font-mono text-xs text-[#D9206E] font-bold uppercase tracking-wider block">
          Technical Domain Catalog
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">
          Explore Technical Directions
        </h1>
        <p className="text-sm text-[#4B4A46] mt-2 max-w-2xl">
          Comprehensive field guides covering Software, Hardware, and Specialized engineering fields. Every domain includes realistic timelines, prerequisites, curated resources, and project ideas.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="card-level-2 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#77736B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domain or tech (e.g. Python, ESP32, React, Verilog)..."
            className="w-full pl-9 pr-4 py-2 text-xs font-sans bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg focus:outline-none focus:border-[#171717] text-[#171717]"
          />
        </div>

        {/* Category & Difficulty Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-[#77736B] font-mono mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>

          {/* Category Pills */}
          {['all', 'software', 'hardware', 'specialized'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-mono uppercase font-bold text-[11px] transition-all ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-[#FFFDF8]'
                  : 'bg-[#EEE9DE] text-[#4B4A46] hover:bg-[#D8D0C2]'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="text-[#D8D0C2]">|</span>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 font-mono text-xs bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg text-[#171717] focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Domain Cards Grid */}
      {filteredDomains.length === 0 ? (
        <div className="card-level-2 rounded-xl p-12 text-center text-[#77736B]">
          <p className="font-medium text-sm">No domains match your filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSelectedDifficulty('all')
              setSearchQuery('')
            }}
            className="mt-3 px-3 py-1.5 text-xs font-mono text-[#D9206E] border border-[#FCD4E2] rounded-lg hover:bg-[#FDF0F5]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDomains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} onSelect={onSelectDomain} />
          ))}
        </div>
      )}
    </div>
  )
}
