import React, { useState } from 'react'
import { AlertTriangle, ArrowRight, ArrowDown, Target, Workflow } from 'lucide-react'
import { goalRoadmaps } from '../data/roadmaps'

interface RoadmapsPageProps {
  onNavigate: (path: string) => void
}

export const RoadmapsPage: React.FC<RoadmapsPageProps> = ({ onNavigate }) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(goalRoadmaps[0].id)
  const currentRoadmap = goalRoadmaps.find((r) => r.id === selectedRoadmapId) || goalRoadmaps[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="font-mono text-xs text-[#2856B6] font-bold uppercase tracking-wider block">
          Sequential Workflow Paths
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">
          Step-by-Step Learning Workflows
        </h1>
        <p className="text-sm text-[#4B4A46] mt-2 max-w-2xl">
          Goal-oriented sequential roadmaps focused on milestone progression. Follow the workflow step by step at your own pace.
        </p>
      </div>

      {/* Roadmap Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#D8D0C2] pb-3">
        {goalRoadmaps.map((rm) => {
          const isSelected = rm.id === selectedRoadmapId
          return (
            <button
              key={rm.id}
              onClick={() => setSelectedRoadmapId(rm.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                isSelected
                  ? 'bg-[#171717] text-[#FFFDF8] shadow-sm'
                  : 'bg-[#EEE9DE] text-[#4B4A46] hover:bg-[#D8D0C2] hover:text-[#171717]'
              }`}
            >
              {rm.title}
            </button>
          )
        })}
      </div>

      {/* Selected Roadmap View */}
      <div className="card-level-1 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D0C2]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#EEF3FB] text-[#2856B6]">
                {currentRoadmap.targetRole}
              </span>
              <span className="text-xs font-mono text-[#77736B]">
                Sequential Path
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#171717]">
              {currentRoadmap.title}
            </h2>
            <p className="text-xs text-[#4B4A46] mt-1">
              {currentRoadmap.description}
            </p>
          </div>

          <button
            onClick={() => onNavigate(`/domain/${currentRoadmap.domainId}`)}
            className="px-4 py-2 bg-[#171717] hover:bg-[#D9206E] text-[#FFFDF8] text-xs font-mono font-semibold rounded-lg transition-colors flex-shrink-0 flex items-center gap-1.5"
          >
            Explore Domain Page <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Sequential Workflow Bar (Desktop & Mobile) */}
        <div className="bg-[#EEE9DE] border border-[#D8D0C2] rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] uppercase">
            <Workflow className="w-4 h-4 text-[#D9206E]" /> Workflow Progression Path:
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {currentRoadmap.phases.map((phase, idx) => (
              <React.Fragment key={phase.phase}>
                <div className="px-3 py-1.5 bg-[#FFFDF8] border border-[#D8D0C2] rounded-lg font-bold text-[#171717]">
                  Phase {phase.phase}: {phase.name}
                </div>
                {idx < currentRoadmap.phases.length - 1 && (
                  <span className="text-[#D9206E] font-bold text-sm">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Phase Step Workflow Cards with Directional Connectors */}
        <div className="space-y-6">
          {currentRoadmap.phases.map((phase, idx) => (
            <React.Fragment key={phase.phase}>
              <div className="bg-[#FFFDF8] border border-[#D8D0C2] rounded-xl p-6 relative card-shadow-hover">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#171717] text-[#D9206E] font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    P{phase.phase}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#171717]">
                    {phase.name}
                  </h3>
                </div>

                <p className="text-xs text-[#4B4A46] leading-relaxed mb-4">
                  {phase.summary}
                </p>

                {/* Topics Pills */}
                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#77736B] block mb-1.5">
                    Step Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.topics.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[11px] font-mono bg-[#EEE9DE] border border-[#D8D0C2] text-[#171717] rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Milestone & Pitfalls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#D8D0C2] text-xs">
                  <div className="bg-[#E8F5F4] border border-[#BCE5E1] p-3.5 rounded-lg text-[#087F73]">
                    <span className="font-mono font-bold uppercase text-[10px] flex items-center gap-1 mb-0.5">
                      <Target className="w-3.5 h-3.5 text-[#087F73]" /> Key Milestone Project
                    </span>
                    <p className="text-[#171717] font-medium">{phase.milestoneProject}</p>
                  </div>

                  <div className="bg-[#FDF0F5] border border-[#FCD4E2] p-3.5 rounded-lg text-[#9F1239]">
                    <span className="font-mono font-bold uppercase text-[10px] flex items-center gap-1 mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D9206E]" /> Pitfalls to Avoid
                    </span>
                    <p className="text-[#881337]">{phase.pitfallsToAvoid.join(' • ')}</p>
                  </div>
                </div>
              </div>

              {/* Step Connector Arrow */}
              {idx < currentRoadmap.phases.length - 1 && (
                <div className="flex items-center justify-center py-1">
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-[#D9206E] flex items-center justify-center border border-[#171717] shadow-sm">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
