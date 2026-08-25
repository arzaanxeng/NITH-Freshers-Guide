import React, { useState } from 'react'
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

export const ChecklistsPage: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(firstYearFlowchartStages[0].id)

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-[#D9206E]" />
      case 'Code':
        return <Code className="w-4 h-4 text-[#2856B6]" />
      case 'Target':
        return <Target className="w-4 h-4 text-[#087F73]" />
      case 'FolderPlus':
        return <FolderPlus className="w-4 h-4 text-[#D97706]" />
      case 'Users':
        return <Users className="w-4 h-4 text-[#D9206E]" />
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#2856B6]" />
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-[#087F73]" />
      case 'Shield':
        return <Shield className="w-4 h-4 text-[#D97706]" />
      default:
        return <Workflow className="w-4 h-4 text-[#D9206E]" />
    }
  }

  const activeStage = firstYearFlowchartStages.find((s) => s.id === selectedStageId)

  // Split stages for Desktop Zig-zag Flowchart layout (1-5 top row, 6-9 bottom row)
  const row1Stages = firstYearFlowchartStages.slice(0, 5)
  const row2Stages = firstYearFlowchartStages.slice(5, 9)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header (Clean Guidance Title - No Progress Stats or Completion Bars) */}
      <div>
        <span className="font-mono text-xs text-[#D9206E] font-bold uppercase tracking-wider block">
          Sequential First-Year Field Guide
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717] mt-1">
          First Year Guidance Flowchart
        </h1>
        <p className="text-sm text-[#4B4A46] mt-1.5 max-w-2xl">
          A step-by-step flow of the essential things every NITH fresher should focus on during their first year.
        </p>
      </div>

      {/* Primary UI: First-Year Flowchart Visualizer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8D0C2] pb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171717]">
            RECOMMENDED FIRST-YEAR WORKFLOW SEQUENCE:
          </span>
          <span className="font-mono text-[11px] text-[#77736B] hidden sm:inline">
            Click any stage node to view detailed guidance
          </span>
        </div>

        {/* DESKTOP ZIG-ZAG FLOWCHART ROADMAP (lg and above) */}
        <div className="hidden lg:block space-y-4 pt-2">
          {/* Row 1: Stages 01 -> 02 -> 03 -> 04 -> 05 */}
          <div className="grid grid-cols-5 gap-3 items-stretch">
            {row1Stages.map((stage, idx) => {
              const isSelected = selectedStageId === stage.id

              return (
                <div key={stage.id} className="relative flex flex-col">
                  <div
                    onClick={() => setSelectedStageId(isSelected ? null : stage.id)}
                    className={`card-level-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-full group ${
                      isSelected
                        ? 'border-[#D9206E] shadow-sm bg-[#FFFDF8] ring-2 ring-[#D9206E]/20'
                        : 'hover:border-[#171717]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-[11px] flex items-center justify-center">
                          0{stage.stepNumber}
                        </span>
                        {getStageIcon(stage.iconName)}
                      </div>

                      <h3 className="font-display font-bold text-sm text-[#171717] leading-snug group-hover:text-[#D9206E] transition-colors">
                        {stage.title}
                      </h3>

                      <p className="text-[11px] text-[#4B4A46] mt-1 line-clamp-2 leading-tight">
                        {stage.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#D8D0C2] flex items-center justify-between text-[11px] font-mono text-[#77736B]">
                      <span>Stage 0{stage.stepNumber}</span>
                      {isSelected ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#D9206E]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#77736B]" />
                      )}
                    </div>
                  </div>

                  {/* Horizontal Connector Arrow */}
                  {idx < row1Stages.length - 1 && (
                    <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-[#171717] text-[#FFFDF8] font-bold text-[10px] flex items-center justify-center">
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Turn Connector between Stage 5 and Stage 6 */}
          <div className="flex justify-end pr-8 py-1">
            <div className="w-8 h-8 rounded-full bg-[#171717] text-[#D9206E] flex items-center justify-center font-bold shadow-sm">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* Row 2: Stages 09 <- 08 <- 07 <- 06 (Right-to-left layout) */}
          <div className="grid grid-cols-5 gap-3 items-stretch">
            <div className="hidden lg:block opacity-0 pointer-events-none" />

            {[...row2Stages].reverse().map((stage, reverseIdx) => {
              const isSelected = selectedStageId === stage.id

              return (
                <div key={stage.id} className="relative flex flex-col">
                  <div
                    onClick={() => setSelectedStageId(isSelected ? null : stage.id)}
                    className={`card-level-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between h-full group ${
                      isSelected
                        ? 'border-[#D9206E] shadow-sm bg-[#FFFDF8] ring-2 ring-[#D9206E]/20'
                        : 'hover:border-[#171717]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="w-6 h-6 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-[11px] flex items-center justify-center">
                          0{stage.stepNumber}
                        </span>
                        {getStageIcon(stage.iconName)}
                      </div>

                      <h3 className="font-display font-bold text-sm text-[#171717] leading-snug group-hover:text-[#D9206E] transition-colors">
                        {stage.title}
                      </h3>

                      <p className="text-[11px] text-[#4B4A46] mt-1 line-clamp-2 leading-tight">
                        {stage.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#D8D0C2] flex items-center justify-between text-[11px] font-mono text-[#77736B]">
                      <span>Stage 0{stage.stepNumber}</span>
                      {isSelected ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#D9206E]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#77736B]" />
                      )}
                    </div>
                  </div>

                  {/* Left Connector Arrow */}
                  {reverseIdx < row2Stages.length - 1 && (
                    <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-[#171717] text-[#FFFDF8] font-bold text-[10px] flex items-center justify-center">
                      <ArrowLeft className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* MOBILE & TABLET VERTICAL FLOWCHART (Below lg screens - 100% responsive, 0 horizontal overflow) */}
        <div className="lg:hidden space-y-3 pt-2">
          {firstYearFlowchartStages.map((stage, idx) => {
            const isSelected = selectedStageId === stage.id

            return (
              <React.Fragment key={stage.id}>
                <div
                  onClick={() => setSelectedStageId(isSelected ? null : stage.id)}
                  className={`card-level-2 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#D9206E] shadow-sm bg-[#FFFDF8] ring-2 ring-[#D9206E]/20'
                      : 'hover:border-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      0{stage.stepNumber}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {getStageIcon(stage.iconName)}
                        <h3 className="font-display font-bold text-sm text-[#171717] truncate">
                          {stage.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#4B4A46] truncate mt-0.5">{stage.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 font-mono text-xs text-[#77736B]">
                    {isSelected ? (
                      <ChevronUp className="w-4 h-4 text-[#D9206E]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#77736B]" />
                    )}
                  </div>
                </div>

                {/* Vertical Connector Arrow */}
                {idx < firstYearFlowchartStages.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-6 h-6 rounded-full bg-[#171717] text-[#D9206E] flex items-center justify-center text-xs">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* SELECTED STAGE GUIDANCE PANEL (Clean Technical Guidance Points) */}
      {activeStage && (
        <div className="card-level-1 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Stage Header */}
          <div className="pb-4 border-b border-[#D8D0C2] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#171717] text-[#D9206E] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                0{activeStage.stepNumber}
              </span>
              <span className="font-mono text-xs font-bold uppercase text-[#D9206E]">
                Stage 0{activeStage.stepNumber} Focus Area
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#171717]">
              {activeStage.title}
            </h2>
            <p className="text-xs text-[#4B4A46] leading-relaxed">{activeStage.subtitle}</p>
          </div>

          {/* Key Technical Guidance Items */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase text-[#171717]">
              Core Guidance & Action Items:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeStage.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF8] border border-[#D8D0C2] rounded-xl p-4 space-y-1 hover:border-[#171717] transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-semibold text-sm text-[#171717]">
                      <CheckCircle className="w-4 h-4 text-[#087F73] flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.categoryTag && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-[#EEE9DE] border border-[#D8D0C2] text-[#77736B]">
                        {item.categoryTag}
                      </span>
                    )}
                  </div>
                  {item.detail && (
                    <p className="text-xs text-[#4B4A46] pl-6 leading-relaxed">
                      {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
