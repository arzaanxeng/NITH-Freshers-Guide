import React from 'react'
import { ShieldAlert, Quote, CheckCircle2, AlertTriangle } from 'lucide-react'
import { RealityPrinciple } from '../../data/types'

interface RealityCardProps {
  principle: RealityPrinciple
}

export const RealityCard: React.FC<RealityCardProps> = ({ principle }) => {
  return (
    <div className="card-level-1 rounded-xl p-6 space-y-4">
      {/* Title & Category */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#FDF0F5] text-[#D9206E] border border-[#FCD4E2]">
            {principle.category}
          </span>
          <h3 className="font-display font-bold text-xl text-[#171717] mt-2 leading-tight">
            {principle.title}
          </h3>
          <p className="font-mono text-xs text-[#D9206E] font-semibold mt-1">
            {principle.tagline}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#EEE9DE] flex items-center justify-center flex-shrink-0 text-[#171717]">
          <ShieldAlert className="w-5 h-5 text-[#D9206E]" />
        </div>
      </div>

      {/* Senior Quote */}
      <div className="bg-[#EEE9DE]/60 border-l-4 border-[#D9206E] p-4 rounded-r-lg">
        <div className="flex gap-2">
          <Quote className="w-4 h-4 text-[#D9206E] flex-shrink-0 mt-0.5" />
          <p className="text-xs italic text-[#171717] leading-relaxed">
            "{principle.seniorQuote}"
          </p>
        </div>
      </div>

      {/* Trap vs Reality Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
        <div className="bg-[#FDF0F5] border border-[#FCD4E2] p-3.5 rounded-lg text-[#9F1239]">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-[#D9206E]" />
            The Common Trap
          </div>
          <p className="leading-relaxed text-[#881337]">{principle.theTrap}</p>
        </div>

        <div className="bg-[#E8F5F4] border border-[#BCE5E1] p-3.5 rounded-lg text-[#087F73]">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#087F73]" />
            The Senior Truth
          </div>
          <p className="leading-relaxed text-[#064E47]">{principle.theReality}</p>
        </div>
      </div>

      {/* Actionable Advice */}
      <div className="bg-[#171717] text-[#FFFDF8] p-3.5 rounded-lg text-xs font-sans flex items-start gap-2">
        <span className="font-mono text-[10px] font-bold uppercase bg-[#D9206E] text-[#FFFDF8] px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
          Action Item
        </span>
        <p className="leading-relaxed">{principle.actionableAdvice}</p>
      </div>
    </div>
  )
}
