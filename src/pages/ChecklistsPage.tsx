import React, { useRef, useState } from 'react'
import {
  Wrench,
  Code,
  Target,
  FolderPlus,
  Users,
  Sparkles,
  Briefcase,
  Shield,
  Workflow,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react'
import { firstYearFlowchartStages } from '../data/checklists'
import type { FlowchartStage } from '../data/types'

const stageNo = (n: number) => String(n).padStart(2, '0')

const getStageIcon = (iconName: string) => {
  switch (iconName) {
    case 'Wrench':
      return <Wrench className="w-4 h-4 text-[#D9206E]" />
    case 'Code':
      return <Code className="w-4 h-4 text-[#2856B6]" />
    case 'Target':
      return <Target className="w-4 h-4 text-[#087F73]" />
    case 'FolderPlus':
      return <FolderPlus className="w-4 h-4 text-[#B45309]" />
    case 'Users':
      return <Users className="w-4 h-4 text-[#D9206E]" />
    case 'Sparkles':
      return <Sparkles className="w-4 h-4 text-[#2856B6]" />
    case 'Briefcase':
      return <Briefcase className="w-4 h-4 text-[#087F73]" />
    case 'Shield':
      return <Shield className="w-4 h-4 text-[#B45309]" />
    default:
      return <Workflow className="w-4 h-4 text-[#D9206E]" />
  }
}

const selectedStyle = 'border-[#D9206E] bg-[#FFFDF8] ring-2 ring-[#D9206E]/20'

export const ChecklistsPage: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(firstYearFlowchartStages[0].id)
  const panelRef = useRef<HTMLDivElement>(null)

  const stages = firstYearFlowchartStages
  const activeIndex = stages.findIndex((s) => s.id === selectedStageId)
  const activeStage = activeIndex >= 0 ? stages[activeIndex] : undefined

  const select = (id: string | null) => {
    setSelectedStageId(id)
    // On desktop the detail panel sits below the 2-row flowchart; bring it into view.
    if (id && window.matchMedia('(min-width: 1024px)').matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
    }
  }
  const toggle = (id: string) => select(selectedStageId === id ? null : id)

  // Desktop zig-zag: stages 1–5 left→right, then 6–9 right→left
  const row1Stages = stages.slice(0, 5)
  const row2Stages = stages.slice(5, 9)

  // Plain render functions (not nested components) so React keeps the DOM nodes —
  // and keyboard focus — between clicks.
  const renderStageButton = (stage: FlowchartStage, compact?: boolean) => {
    const isSelected = selectedStageId === stage.id
    return compact ? (
      <button
        type="button"
        onClick={() => toggle(stage.id)}
        aria-expanded={isSelected}
        aria-controls={`stage-panel-${stage.id}`}
        className={`card-level-2 w-full text-left rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between gap-3 ${isSelected ? selectedStyle : 'hover:border-[#171717]'}`}
      >
        <span className="flex items-center gap-3 min-w-0">
          <span className="w-8 h-8 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
            {stageNo(stage.stepNumber)}
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              {getStageIcon(stage.iconName)}
              <span className="font-display font-bold text-base text-[#171717]">{stage.title}</span>
            </span>
            <span className="block text-sm text-[#4B4A46] mt-0.5">{stage.subtitle}</span>
          </span>
        </span>
        {isSelected ? <ChevronUp className="w-5 h-5 text-[#D9206E] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#625E56] flex-shrink-0" />}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => toggle(stage.id)}
        aria-expanded={isSelected}
        aria-controls={`stage-panel-desktop-${stage.id}`}
        className={`card-level-2 text-left rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-full w-full group ${isSelected ? selectedStyle : 'hover:border-[#171717]'}`}
      >
        <span>
          <span className="flex items-center justify-between gap-1 mb-2">
            <span className="w-7 h-7 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-xs flex items-center justify-center">
              {stageNo(stage.stepNumber)}
            </span>
            {getStageIcon(stage.iconName)}
          </span>
          <span className="block font-display font-bold text-base text-[#171717] leading-snug group-hover:text-[#D9206E] transition-colors">{stage.title}</span>
          <span className="block text-sm text-[#4B4A46] mt-1 line-clamp-3 leading-snug">{stage.subtitle}</span>
        </span>
        <span className="mt-3 pt-2 border-t border-[#D8D0C2] flex items-center justify-between text-xs font-mono text-[#625E56]">
          <span>Stage {stageNo(stage.stepNumber)}</span>
          {isSelected ? <ChevronUp className="w-4 h-4 text-[#D9206E]" /> : <ChevronDown className="w-4 h-4 text-[#625E56]" />}
        </span>
      </button>
    )
  }

  const renderStagePanel = (stage: FlowchartStage, index: number, idPrefix = 'stage-panel') => (
    <div id={`${idPrefix}-${stage.id}`} className="card-level-1 rounded-2xl p-5 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-[#D8D0C2] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#171717] text-[#FF4D94] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
            {stageNo(stage.stepNumber)}
          </span>
          <span className="font-mono text-sm font-bold uppercase text-[#C21A62]">Stage {stageNo(stage.stepNumber)} of {stageNo(stages.length)}</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#171717]">{stage.title}</h2>
        <p className="text-base text-[#4B4A46] leading-relaxed reading">{stage.subtitle}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-sm font-bold uppercase text-[#171717]">Core Guidance & Action Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stage.items.map((item) => (
            <div key={item.id} className="bg-[#FFFDF8] border border-[#D8D0C2] rounded-xl p-4 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 font-semibold text-base text-[#171717]">
                  <CheckCircle className="w-4 h-4 text-[#087F73] flex-shrink-0 mt-1" />
                  <span>{item.label}</span>
                </div>
                {item.categoryTag && (
                  <span className="px-2 py-0.5 text-xs font-mono font-bold uppercase rounded bg-[#EEE9DE] border border-[#D8D0C2] text-[#625E56] flex-shrink-0">
                    {item.categoryTag}
                  </span>
                )}
              </div>
              {item.detail && <p className="text-sm text-[#4B4A46] pl-6 leading-relaxed">{item.detail}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Previous / next stage */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#D8D0C2]">
        {index > 0 ? (
          <button
            type="button"
            onClick={() => select(stages[index - 1].id)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold whitespace-nowrap text-[#171717] bg-[#EEE9DE] hover:bg-[#D8D0C2] border border-[#D8D0C2] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Stage {stageNo(stages[index - 1].stepNumber)}
          </button>
        ) : (
          <span />
        )}
        {index < stages.length - 1 && (
          <button
            type="button"
            onClick={() => select(stages[index + 1].id)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[#FFFDF8] bg-[#171717] hover:bg-[#D9206E] rounded-lg transition-colors"
          >
            Stage {stageNo(stages[index + 1].stepNumber)}: {stages[index + 1].title} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="font-mono text-xs text-[#C21A62] font-bold uppercase tracking-wider block">Sequential First-Year Field Guide</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">First Year Guidance Flowchart</h1>
        <p className="text-base text-[#4B4A46] mt-2 max-w-2xl leading-relaxed">
          A step-by-step flow of the essential things every NITH fresher should focus on during their first year.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8D0C2] pb-2">
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#171717]">Recommended first-year sequence</span>
          <span className="font-mono text-xs text-[#625E56] hidden sm:inline">Select a stage for detailed guidance</span>
        </div>

        {/* DESKTOP ZIG-ZAG (lg and above) */}
        <div className="hidden lg:block space-y-4 pt-2">
          <ol className="grid grid-cols-5 gap-4 items-stretch">
            {row1Stages.map((stage, idx) => (
              <li key={stage.id} className="relative flex flex-col">
                {renderStageButton(stage)}
                {idx < row1Stages.length - 1 && (
                  <div aria-hidden="true" className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#171717] text-[#FFFDF8] flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Turn from stage 5 down to stage 6 (which sits in the right-most column of row 2) */}
          <div aria-hidden="true" className="grid grid-cols-5 gap-4">
            <div className="col-start-5 flex justify-center py-1">
              <div className="w-8 h-8 rounded-full bg-[#171717] text-[#FF4D94] flex items-center justify-center">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Row 2 reads right→left: 06 → 07 → 08 → 09 */}
          <ol className="grid grid-cols-5 gap-4 items-stretch">
            <li aria-hidden="true" className="opacity-0 pointer-events-none" />
            {[...row2Stages].reverse().map((stage, reverseIdx) => (
              <li key={stage.id} className="relative flex flex-col">
                {renderStageButton(stage)}
                {/* An arrow on a card's left edge points at the NEXT stage (to its left),
                    so every card except the last (stage 9, leftmost) gets one. Previously
                    these sat on stages 9/8/7 and were missing from stage 6 — pointing the
                    wrong way round the loop. */}
                {reverseIdx > 0 && (
                  <div aria-hidden="true" className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#171717] text-[#FFFDF8] flex items-center justify-center">
                    <ArrowLeft className="w-3 h-3" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* MOBILE / TABLET: vertical accordion — details open right under the tapped stage */}
        <ol className="lg:hidden space-y-3 pt-2">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              <li className="space-y-3">
                {renderStageButton(stage, true)}
                {selectedStageId === stage.id && renderStagePanel(stage, idx)}
              </li>
              {idx < stages.length - 1 && (
                <li aria-hidden="true" className="flex justify-center py-0.5">
                  <div className="w-6 h-6 rounded-full bg-[#171717] text-[#FF4D94] flex items-center justify-center">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div>

      {/* DESKTOP detail panel */}
      <div ref={panelRef} className="hidden lg:block scroll-mt-24">
        {activeStage && renderStagePanel(activeStage, activeIndex, 'stage-panel-desktop')}
      </div>
    </div>
  )
}
