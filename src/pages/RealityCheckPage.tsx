import React from 'react'
import { realityPrinciples } from '../data/realityCheck'
import { RealityCard } from '../components/cards/RealityCard'

export const RealityCheckPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="font-mono text-xs text-[#D9206E] font-bold uppercase tracking-wider block">
          Senior Reality Check
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">
          Unvarnished Truths & Common Fresher Traps
        </h1>
        <p className="text-sm text-[#4B4A46] mt-2 max-w-2xl">
          Direct, honest advice from senior students. Avoid tutorial hell, certificate traps, trending tech hype, and false LinkedIn metrics.
        </p>
      </div>

      {/* Quick Senior Direct Statements Banner */}
      <div className="bg-[#EEE9DE] border border-[#D8D0C2] rounded-xl p-5 font-mono text-xs text-[#171717] space-y-2">
        <span className="font-bold uppercase tracking-wider text-[#D9206E] block mb-1">
          Direct Senior Statements:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-[#4B4A46]">
          <div>• Don't learn eight domains at once.</div>
          <div>• Certificates do not replace projects.</div>
          <div>• Tutorial completion is not skill.</div>
          <div>• You don't need to chase every AI trend.</div>
          <div>• Build before collecting another playlist.</div>
          <div>• CGPA and skills are not mutually exclusive.</div>
          <div>• Your first project will probably be bad. Build it anyway.</div>
        </div>
      </div>

      {/* Reality Cards List */}
      <div className="space-y-8">
        {realityPrinciples.map((principle) => (
          <RealityCard key={principle.id} principle={principle} />
        ))}
      </div>
    </div>
  )
}
