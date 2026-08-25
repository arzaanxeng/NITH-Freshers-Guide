import React, { useState } from 'react'
import { Users, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react'
import { nithClubs, nithDisclaimer, seniorSurvivalTips } from '../data/nith'
import { ClubCard } from '../components/cards/ClubCard'

export const NithEcosystemPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('all')

  const filteredClubs = nithClubs.filter((c) => {
    if (selectedTab === 'all') return true
    return c.type === selectedTab
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#087F73] font-bold uppercase tracking-wider block">
            NIT Hamirpur Student Guide
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#E8F5F4] text-[#087F73] border border-[#BCE5E1] rounded inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> OFFICIAL SOURCE • Verified Aug 2026
          </span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">
          NITH Technical Ecosystem & Clubs
        </h1>
        <p className="text-sm text-[#4B4A46] mt-2 max-w-2xl">
          An introduction to Nimbus departmental teams, student technical societies, major campus hackathons, and practical campus survival tips.
        </p>
      </div>

      {/* Grounding Disclaimer Banner */}
      <div className="bg-[#FEF8EC] border border-[#FDE6B8] rounded-xl p-4 flex items-start gap-3 text-xs text-[#92400E]">
        <AlertCircle className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-mono font-bold uppercase block mb-0.5">Official Verification Disclaimer</span>
          <p>{nithDisclaimer}</p>
        </div>
      </div>

      {/* Senior Survival Tips Section */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-2xl text-[#171717] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D9206E]" />
          Senior Campus Survival Tips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seniorSurvivalTips.map((tip, idx) => (
            <div key={idx} className="card-level-2 rounded-xl p-5 space-y-1">
              <h3 className="font-display font-bold text-base text-[#171717]">{tip.title}</h3>
              <p className="text-xs text-[#4B4A46] leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#D8D0C2] pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2856B6]" />
            <h2 className="font-display font-bold text-2xl text-[#171717]">
              Technical Teams & Societies
            </h2>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono">
            {[
              { id: 'all', label: 'All Bodies' },
              { id: 'departmental_team', label: 'Nimbus Dept Teams' },
              { id: 'technical_society', label: 'Technical Societies' },
              { id: 'annual_event', label: 'Annual Fests' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'bg-[#EEE9DE] text-[#4B4A46] hover:bg-[#D8D0C2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Club Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </div>
  )
}
