import React, { useState } from 'react'
import { Search, Filter, BookOpen, ShieldCheck } from 'lucide-react'
import { allResources } from '../data/resources'
import { allDomains } from '../data/domains'
import { ResourceCard } from '../components/cards/ResourceCard'

export const ResourcesPage: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredResources = allResources.filter((res) => {
    const matchesDomain = selectedDomain === 'all' || res.domain === selectedDomain
    const matchesType = selectedType === 'all' || res.type === selectedType
    const matchesLevel = selectedLevel === 'all' || res.level === selectedLevel
    const matchesSearch =
      searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.tags && res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesDomain && matchesType && matchesLevel && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#087F73] font-bold uppercase tracking-wider block">
            Centralized Resource Directory
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#E8F5F4] text-[#087F73] border border-[#BCE5E1] rounded inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Resources Verified Aug 2026
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">
          Curated Technical Resources
        </h1>
        <p className="text-sm text-[#4B4A46] mt-2 max-w-2xl">
          Quality over quantity. Every resource in this directory has been audited and verified with live links to top educators, official documentation, and practice platforms.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="card-level-2 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#77736B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, creator (CampusX, Striver), or topic..."
            className="w-full pl-9 pr-4 py-2 text-xs font-sans bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg focus:outline-none focus:border-[#171717] text-[#171717]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-[#77736B] font-mono mr-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-1.5 font-mono text-xs bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg text-[#171717] focus:outline-none"
          >
            <option value="all">All Domains</option>
            {allDomains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Format / Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 font-mono text-xs bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg text-[#171717] focus:outline-none"
          >
            <option value="all">All Formats</option>
            <option value="youtube">YouTube Video</option>
            <option value="playlist">YouTube Playlist</option>
            <option value="documentation">Official Documentation</option>
            <option value="practice">Practice Platform</option>
            <option value="course">Free Course</option>
            <option value="github">GitHub Repository</option>
          </select>

          {/* Level Dropdown */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1.5 font-mono text-xs bg-[#EEE9DE] border border-[#D8D0C2] rounded-lg text-[#171717] focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-[#77736B]">
        <span>Showing {filteredResources.length} of {allResources.length} curated resources</span>
        {(selectedDomain !== 'all' || selectedType !== 'all' || selectedLevel !== 'all' || searchQuery !== '') && (
          <button
            onClick={() => {
              setSelectedDomain('all')
              setSelectedType('all')
              setSelectedLevel('all')
              setSearchQuery('')
            }}
            className="text-[#D9206E] hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="card-level-2 rounded-xl p-12 text-center text-[#77736B]">
          <BookOpen className="w-8 h-8 text-[#77736B] mx-auto mb-2" />
          <p className="font-medium text-sm">No resources match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      )}
    </div>
  )
}
