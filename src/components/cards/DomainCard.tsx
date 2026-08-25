import React from 'react'
import { ArrowRight, Workflow, Award, Layers } from 'lucide-react'
import { Domain } from '../../data/types'

interface DomainCardProps {
  domain: Domain
  onSelect: (id: string) => void
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onSelect }) => {
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'software':
        return 'bg-[#EEF3FB] text-[#2856B6] border-[#CBDCF7]'
      case 'hardware':
        return 'bg-[#E8F5F4] text-[#087F73] border-[#BCE5E1]'
      case 'specialized':
        return 'bg-[#FEF8EC] text-[#D97706] border-[#FDE6B8]'
      default:
        return 'bg-[#EEE9DE] text-[#4B4A46] border-[#D8D0C2]'
    }
  }

  return (
    <div
      onClick={() => onSelect(domain.id)}
      className="card-level-2 rounded-xl p-5 card-shadow-hover cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getCategoryBadge(domain.category)}`}>
            {domain.category}
          </span>
          <span className="text-xs font-mono text-[#77736B]">
            {domain.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-[#171717] group-hover:text-[#D9206E] transition-colors leading-tight">
          {domain.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#4B4A46] mt-2 line-clamp-3 leading-relaxed">
          {domain.shortDescription}
        </p>

        {/* Key Info Pills */}
        <div className="mt-4 pt-3 border-t border-[#D8D0C2] space-y-1.5 text-xs text-[#77736B]">
          <div className="flex items-center gap-1.5">
            <Workflow className="w-3.5 h-3.5 text-[#D9206E]" />
            <span className="font-mono text-[11px] truncate">Sequential Workflow Path</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#087F73]" />
            <span className="truncate">Good for: {domain.goodFor.slice(0, 3).join(', ')}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2856B6]" />
            <span className="truncate">Tech: {domain.coreTechnologies.map(t => t.name).slice(0, 4).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-[#D8D0C2] flex items-center justify-between text-xs font-semibold text-[#171717] group-hover:text-[#D9206E]">
        <span>Explore Roadmap & Resources</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  )
}
