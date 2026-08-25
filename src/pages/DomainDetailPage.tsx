import React from 'react'
import { ArrowLeft, ArrowDown, Award, AlertTriangle, BookOpen, ExternalLink, Sparkles, CheckCircle2, Code, Layers, ShieldAlert, Workflow } from 'lucide-react'
import { getDomainById } from '../data/domains'
import { getResourcesByDomain } from '../data/resources'
import { ResourceCard } from '../components/cards/ResourceCard'

interface DomainDetailPageProps {
  domainId: string
  onBack: () => void
  onNavigate: (path: string) => void
}

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({ domainId, onBack, onNavigate }) => {
  const domain = getDomainById(domainId)
  const resources = getResourcesByDomain(domainId)

  if (!domain) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-[#77736B]">
        <h2 className="text-xl font-bold text-[#171717]">Domain Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-[#171717] text-[#FFFDF8] rounded-lg text-xs font-mono">
          ← Back to Catalog
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#77736B] hover:text-[#171717] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Domain Catalog
      </button>

      {/* Header Banner */}
      <div className="card-level-1 rounded-2xl p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold uppercase rounded bg-[#171717] text-[#FFFDF8]">
              {domain.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold uppercase rounded bg-[#EEE9DE] text-[#171717] border border-[#D8D0C2]">
              {domain.difficulty} Level
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#77736B]">
            <Workflow className="w-4 h-4 text-[#D9206E]" />
            <span>Sequential Learning Path</span>
          </div>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#171717]">
          {domain.name}
        </h1>

        <p className="text-base text-[#4B4A46] leading-relaxed max-w-4xl">
          {domain.fullDescription}
        </p>

        {/* Good For & Prerequisites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#D8D0C2] text-xs">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase text-[#171717] mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#087F73]" /> What Is This Good For?
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {domain.goodFor.map((gf) => (
                <span key={gf} className="px-2.5 py-1 bg-[#E8F5F4] text-[#087F73] border border-[#BCE5E1] rounded-md font-medium">
                  {gf}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase text-[#171717] mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2856B6]" /> Prerequisites Before Starting
            </h3>
            <ul className="space-y-1 text-[#4B4A46] list-disc list-inside">
              {domain.prerequisites.map((prereq, i) => (
                <li key={i}>{prereq}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Don't Start If... Senior Warning */}
      <div className="bg-[#FDF0F5] border border-[#FCD4E2] rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-[#D9206E]">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <h3 className="font-display font-bold text-lg text-[#9F1239]">
            Don't start {domain.name} if... (Honest Senior Warning)
          </h3>
        </div>
        <ul className="space-y-2 text-xs text-[#881337] font-medium">
          {domain.dontStartIf.map((warning, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D9206E] flex-shrink-0 mt-0.5" />
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Core Technologies Required */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#2856B6]" />
          <h2 className="font-display font-bold text-2xl text-[#171717]">
            What Do I Actually Need? (Technologies & Documentation)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domain.coreTechnologies.map((tech) => (
            <div key={tech.name} className="card-level-2 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-[#171717]">{tech.name}</h4>
                <p className="text-xs text-[#4B4A46] mt-1">{tech.description}</p>
              </div>

              {tech.docUrl && (
                <div className="mt-3 pt-3 border-t border-[#D8D0C2]">
                  <a
                    href={tech.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#087F73] hover:underline"
                  >
                    Official Reference Docs <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sequential Roadmap Workflow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-[#D9206E]" />
            <h2 className="font-display font-bold text-2xl text-[#171717]">
              Sequential Workflow Roadmap
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/roadmaps')}
            className="text-xs font-mono text-[#D9206E] hover:underline"
          >
            View All Roadmaps →
          </button>
        </div>

        {/* Horizontal Workflow Summary Bar */}
        <div className="bg-[#EEE9DE] border border-[#D8D0C2] rounded-xl p-4 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="font-bold text-[#171717] uppercase mr-1">Progression Flow:</span>
          {domain.roadmapSteps.map((step, idx) => (
            <React.Fragment key={step.step}>
              <span className="px-2.5 py-1 bg-[#FFFDF8] border border-[#D8D0C2] rounded text-[#171717] font-semibold">
                Step {step.step}: {step.title}
              </span>
              {idx < domain.roadmapSteps.length - 1 && (
                <span className="text-[#D9206E] font-bold text-sm">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Cards with Arrow Connectors */}
        <div className="space-y-4">
          {domain.roadmapSteps.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div className="card-level-2 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#171717]">{step.title}</h3>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {step.topics.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-[#EEF3FB] text-[#2856B6] rounded font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#171717] font-semibold mt-3">
                      🎯 Key Milestone: <span className="font-normal text-[#4B4A46]">{step.keyMilestone}</span>
                    </p>
                  </div>
                </div>
              </div>

              {idx < domain.roadmapSteps.length - 1 && (
                <div className="flex items-center justify-center py-0.5">
                  <div className="w-7 h-7 rounded-full bg-[#171717] text-[#D9206E] flex items-center justify-center border border-[#171717]">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recommended Verified Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#087F73]" />
            <h2 className="font-display font-bold text-2xl text-[#171717]">
              Curated Verified Resources
            </h2>
          </div>
          <span className="font-mono text-xs text-[#77736B]">
            {resources.length} Verified Links
          </span>
        </div>

        {/* Primary Creator Spotlight */}
        {domain.primaryCreatorSpotlight && (
          <div className="bg-[#FDF0F5] border border-[#FCD4E2] rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#D9206E] flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-mono font-bold uppercase text-[#D9206E] text-[10px]">
                Recommended Creator Spotlight
              </span>
              <h4 className="font-display font-bold text-sm text-[#171717]">
                {domain.primaryCreatorSpotlight.name}
              </h4>
              <p className="text-[#4B4A46]">{domain.primaryCreatorSpotlight.reason}</p>
              <p className="font-mono text-[11px] text-[#881337] pt-1">
                👉 Recommended Start: {domain.primaryCreatorSpotlight.recommendedStart}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Realistic Project Ideas */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-2xl text-[#171717]">
          Realistic Projects to Build
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domain.projectIdeas.map((project, idx) => (
            <div key={idx} className="card-level-2 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase font-bold bg-[#EEE9DE] text-[#171717] rounded">
                  {project.level} Project
                </span>
                <h4 className="font-display font-bold text-base text-[#171717] mt-2">
                  {project.title}
                </h4>
                <p className="text-xs text-[#4B4A46] mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D8D0C2]">
                <span className="font-mono text-[10px] uppercase text-[#77736B] block mb-1">Stack:</span>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 text-[10px] font-mono bg-[#EEE9DE] text-[#171717] rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
