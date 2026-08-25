import React from 'react'
import { Calendar, Award, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react'
import { NithClub } from '../../data/types'

interface ClubCardProps {
  club: NithClub
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'departmental_team':
        return 'bg-[#EEF3FB] text-[#2856B6] border-[#CBDCF7]'
      case 'technical_society':
        return 'bg-[#E8F5F4] text-[#087F73] border-[#BCE5E1]'
      case 'annual_event':
        return 'bg-[#FDF0F5] text-[#D9206E] border-[#FCD4E2]'
      default:
        return 'bg-[#EEE9DE] text-[#4B4A46] border-[#D8D0C2]'
    }
  }

  return (
    <div className="card-level-2 rounded-xl p-6 flex flex-col justify-between space-y-4">
      <div>
        {/* Type Badge & Department */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${getTypeBadge(club.type)}`}>
            {club.type.replace('_', ' ')}
          </span>
          {club.department && (
            <span className="text-[11px] font-mono text-[#77736B]">
              {club.department}
            </span>
          )}
        </div>

        {/* Club Name */}
        <h3 className="font-display font-bold text-xl text-[#171717] leading-snug">
          {club.name}
        </h3>
        {club.fullName && club.fullName !== club.name && (
          <p className="font-mono text-xs text-[#77736B] mt-0.5">{club.fullName}</p>
        )}

        {/* Description */}
        <p className="text-xs text-[#4B4A46] mt-3 leading-relaxed">
          {club.description}
        </p>

        {/* Focus Areas */}
        <div className="mt-4 pt-3 border-t border-[#D8D0C2]">
          <h4 className="font-mono text-[11px] font-bold uppercase text-[#171717] mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#087F73]" />
            Core Focus Areas
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {club.focusAreas.map((area) => (
              <span key={area} className="px-2 py-0.5 text-[10px] font-mono bg-[#EEE9DE] text-[#171717] rounded border border-[#D8D0C2]">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Key Events */}
        {club.keyEvents && club.keyEvents.length > 0 && (
          <div className="mt-3">
            <h4 className="font-mono text-[11px] font-bold uppercase text-[#171717] mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D9206E]" />
              Major Fest & Event Roles
            </h4>
            <ul className="text-xs text-[#4B4A46] space-y-1 pl-1">
              {club.keyEvents.map((evt) => (
                <li key={evt} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#087F73] flex-shrink-0" />
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* How to join & Senior Tip & Verification Badge */}
      <div className="space-y-2 pt-3 border-t border-[#D8D0C2] text-xs">
        <div className="bg-[#EEE9DE]/50 p-3 rounded-lg border border-[#D8D0C2]">
          <span className="font-mono text-[10px] font-bold uppercase text-[#171717] block mb-0.5">
            How to Join
          </span>
          <p className="text-[#4B4A46]">{club.howToJoin}</p>
        </div>

        <div className="bg-[#FDF0F5] p-3 rounded-lg border border-[#FCD4E2]">
          <span className="font-mono text-[10px] font-bold uppercase text-[#D9206E] flex items-center gap-1 mb-0.5">
            <Sparkles className="w-3 h-3" /> Senior Insight
          </span>
          <p className="text-[#881337]">{club.seniorTip}</p>
        </div>

        {/* Subtle Verification Indicator (Section 22) */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#77736B] pt-1">
          <span className="flex items-center gap-1 text-[#087F73]">
            <ShieldCheck className="w-3 h-3" /> OFFICIAL SOURCE • Verified Aug 2026
          </span>
        </div>
      </div>
    </div>
  )
}
