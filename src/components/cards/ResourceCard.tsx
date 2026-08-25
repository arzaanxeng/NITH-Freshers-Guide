import React, { useState } from 'react'
import { ExternalLink, Check, Copy, Sparkles, BookOpen, ShieldCheck } from 'lucide-react'
import { Resource } from '../../data/types'

interface ResourceCardProps {
  resource: Resource
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(resource.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-[#E8F5F4] text-[#087F73] border-[#BCE5E1]'
      case 'intermediate':
        return 'bg-[#EEF3FB] text-[#2856B6] border-[#CBDCF7]'
      case 'advanced':
        return 'bg-[#FDF0F5] text-[#D9206E] border-[#FCD4E2]'
      default:
        return 'bg-[#EEE9DE] text-[#4B4A46] border-[#D8D0C2]'
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'youtube':
      case 'playlist':
        return 'bg-[#FDF0F5] text-[#D9206E] border-[#FCD4E2]'
      case 'documentation':
        return 'bg-[#E8F5F4] text-[#087F73] border-[#BCE5E1]'
      case 'practice':
        return 'bg-[#FEF8EC] text-[#D97706] border-[#FDE6B8]'
      default:
        return 'bg-[#EEE9DE] text-[#4B4A46] border-[#D8D0C2]'
    }
  }

  return (
    <div className="card-level-2 rounded-xl p-5 card-shadow-hover flex flex-col justify-between relative group">
      <div>
        {/* Top Badges & Verification Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getTypeBadgeColor(resource.type)}`}>
              {resource.type}
            </span>
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getLevelBadgeColor(resource.level)}`}>
              {resource.level}
            </span>
            {resource.isPrimary && (
              <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#171717] text-[#D9206E]">
                <Sparkles className="w-2.5 h-2.5" /> Primary
              </span>
            )}
          </div>

          <button
            onClick={handleCopyLink}
            className="p-1 rounded text-[#77736B] hover:text-[#171717] hover:bg-[#EEE9DE] transition-colors"
            title="Copy link"
            aria-label="Copy resource URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#087F73]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Creator Attribution */}
        <p className="font-mono text-xs text-[#D9206E] font-semibold tracking-wide uppercase">
          {resource.creator}
        </p>

        {/* Title */}
        <h3 className="font-display font-bold text-base text-[#171717] mt-1 leading-snug">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#4B4A46] mt-2 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {resource.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 bg-[#EEE9DE] text-[#77736B] rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Verification Badge & Action Buttons */}
      <div>
        {/* Verification Status (Section 19) */}
        <div className="mt-3 pt-2 flex items-center justify-between text-[10px] font-mono text-[#77736B]">
          <span className="flex items-center gap-1 text-[#087F73]">
            <ShieldCheck className="w-3 h-3" />
            {resource.official ? 'Official Reference Docs' : 'Verified Aug 2026'}
          </span>
        </div>

        <div className="pt-3 mt-2 border-t border-[#D8D0C2] flex items-center justify-between gap-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#FFFDF8] bg-[#171717] hover:bg-[#D9206E] rounded-lg transition-colors"
          >
            Open Resource
            <ExternalLink className="w-3 h-3" />
          </a>

          {resource.officialDocUrl && (
            <a
              href={resource.officialDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-[#171717] bg-[#EEE9DE] hover:bg-[#D8D0C2] border border-[#D8D0C2] rounded-lg transition-colors"
              title="Official Reference Documentation"
            >
              <BookOpen className="w-3 h-3 text-[#087F73]" />
              Docs
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
