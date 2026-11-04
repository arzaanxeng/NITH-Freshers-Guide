import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Award,
  AlertTriangle,
  BookOpen,
  Clock,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Code,
  Layers,
  ShieldAlert,
  Workflow,
  Hammer,
} from 'lucide-react'
import { allDomains, getDomainById } from '../data/domains'
import { getResourcesByDomain } from '../data/resources'
import { ResourceCard } from '../components/cards/ResourceCard'

interface DomainDetailPageProps {
  domainId: string
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'warning', label: "Don't start if…" },
  { id: 'technologies', label: 'Technologies' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'resources', label: 'Resources' },
  { id: 'projects', label: 'Projects' },
]

// Highlights the section currently in view in the "On this page" nav
const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState(SECTIONS[0].id)
  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [enabled])
  return active
}

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({ domainId }) => {
  const domain = getDomainById(domainId)
  const resources = getResourcesByDomain(domainId)
  const active = useActiveSection(Boolean(domain))

  if (!domain) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9206E]">Domain not found</span>
        <h1 className="font-display font-bold text-3xl text-[#171717]">There's no domain called "{domainId}"</h1>
        <p className="text-base text-[#4B4A46]">It may have been renamed. Pick one from the catalog:</p>
        <a href="/explore" className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 bg-[#171717] hover:bg-[#D9206E] text-[#FFFDF8] rounded-lg text-sm font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Domain Catalog
        </a>
      </div>
    )
  }

  const index = allDomains.findIndex((d) => d.id === domain.id)
  const prev = index > 0 ? allDomains[index - 1] : null
  const next = index < allDomains.length - 1 ? allDomains[index + 1] : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a href="/explore" className="inline-flex items-center gap-1.5 text-sm font-mono text-[#625E56] hover:text-[#171717] transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Domain Catalog
      </a>

      <div className="lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10">
        {/* On this page: sticky sidebar on desktop, scrollable chip bar on mobile */}
        <nav
          aria-label="On this page"
          className="no-print mb-8 lg:mb-0 sticky top-[3.75rem] z-20 -mx-4 px-4 py-2 bg-[#F5F1E8]/95 backdrop-blur lg:bg-transparent lg:backdrop-blur-none lg:mx-0 lg:px-0 lg:top-24 lg:self-start lg:py-0 lg:h-fit"
        >
          <p className="hidden lg:block font-mono text-xs font-bold uppercase tracking-wider text-[#625E56] mb-3">On this page</p>
          <ul className="flex lg:flex-col gap-2 lg:gap-0.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {SECTIONS.map((s) => (
              <li key={s.id} className="flex-shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`block whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border lg:border-0 lg:border-l-2 lg:rounded-none ${
                    active === s.id
                      ? 'bg-[#171717] text-[#FFFDF8] border-[#171717] lg:bg-transparent lg:text-[#171717] lg:border-[#D9206E] lg:font-bold'
                      : 'bg-[#FFFDF8] text-[#4B4A46] border-[#D8D0C2] lg:bg-transparent lg:border-transparent hover:text-[#171717] lg:hover:border-[#D8D0C2]'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-14">
          {/* Header Banner */}
          <section id="overview" className="card-level-1 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold uppercase rounded bg-[#171717] text-[#FFFDF8]">
                  {domain.category}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold uppercase rounded bg-[#EEE9DE] text-[#171717] border border-[#D8D0C2]">
                  {domain.difficulty} Level
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-mono text-[#625E56]">
                <Workflow className="w-4 h-4 text-[#D9206E]" />
                <span>Sequential Learning Path</span>
              </div>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#171717]">{domain.name}</h1>

            {domain.timeline && (
              <p className="flex items-start gap-2 text-sm font-mono font-semibold text-[#065F56] bg-[#E8F5F4] border border-[#BCE5E1] rounded-lg px-3 py-2 w-fit max-w-full">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>Typical timeline: {domain.timeline}</span>
              </p>
            )}

            <p className="text-lg text-[#3F3D39] leading-8 reading">{domain.fullDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-[#D8D0C2]">
              <div>
                <h2 className="font-mono text-sm font-bold uppercase text-[#171717] mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#087F73]" /> What Is This Good For?
                </h2>
                <div className="flex flex-wrap gap-2">
                  {domain.goodFor.map((gf) => (
                    <span key={gf} className="px-3 py-1 text-sm bg-[#E8F5F4] text-[#065F56] border border-[#BCE5E1] rounded-md font-medium">
                      {gf}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-mono text-sm font-bold uppercase text-[#171717] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2856B6]" /> Prerequisites Before Starting
                </h2>
                <ul className="space-y-1.5 text-base text-[#3F3D39] list-disc pl-5 leading-relaxed">
                  {domain.prerequisites.map((prereq, i) => (
                    <li key={i}>{prereq}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Don't Start If... */}
          <section id="warning" className="bg-[#FDF0F5] border border-[#FCD4E2] rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-1 text-[#D9206E]" />
              <h2 className="font-display font-bold text-xl text-[#9F1239]">
                Don't start {domain.name} if… <span className="font-normal text-base">(honest senior warning)</span>
              </h2>
            </div>
            <ul className="space-y-3 text-base text-[#7F1030] leading-relaxed">
              {domain.dontStartIf.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#D9206E] flex-shrink-0 mt-1" />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Core Technologies */}
          <section id="technologies" className="space-y-5">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2856B6]" />
              <h2 className="font-display font-bold text-2xl text-[#171717]">What Do I Actually Need?</h2>
            </div>
            <p className="text-base text-[#625E56] -mt-2">Technologies to learn, with official documentation.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domain.coreTechnologies.map((tech) => (
                <div key={tech.name} className="card-level-2 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#171717]">{tech.name}</h3>
                    <p className="text-sm text-[#4B4A46] mt-1.5 leading-relaxed">{tech.description}</p>
                  </div>
                  {tech.docUrl && (
                    <div className="mt-3 pt-3 border-t border-[#D8D0C2]">
                      <a
                        href={tech.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-mono font-semibold text-[#087F73] hover:underline"
                      >
                        Official Reference Docs <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Sequential Roadmap */}
          <section id="roadmap" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#D9206E]" />
                <h2 className="font-display font-bold text-2xl text-[#171717]">Sequential Workflow Roadmap</h2>
              </div>
              <a href="/roadmaps" className="text-sm font-mono text-[#C21A62] hover:underline">
                View All Roadmaps →
              </a>
            </div>

            <ol className="space-y-3">
              {domain.roadmapSteps.map((step, idx) => (
                <React.Fragment key={step.step}>
                  <li className="card-level-2 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display font-bold text-lg text-[#171717]">{step.title}</h3>
                        {step.duration && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono text-[#625E56] bg-[#EEE9DE] border border-[#D8D0C2] rounded px-2 py-0.5">
                            <Clock className="w-3 h-3" /> {step.duration}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {step.topics.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-xs font-mono bg-[#EEF3FB] text-[#2856B6] rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="text-base text-[#171717] font-semibold mt-3 leading-relaxed">
                        🎯 Key Milestone: <span className="font-normal text-[#3F3D39]">{step.keyMilestone}</span>
                      </p>
                    </div>
                  </li>

                  {idx < domain.roadmapSteps.length - 1 && (
                    <li aria-hidden="true" className="flex items-center justify-center py-0.5">
                      <div className="w-7 h-7 rounded-full bg-[#171717] text-[#FF4D94] flex items-center justify-center">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ol>
          </section>

          {/* Resources */}
          <section id="resources" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#087F73]" />
                <h2 className="font-display font-bold text-2xl text-[#171717]">Curated Verified Resources</h2>
              </div>
              <span className="font-mono text-sm text-[#625E56]">{resources.length} verified links</span>
            </div>

            {domain.primaryCreatorSpotlight && (
              <div className="bg-[#FDF0F5] border border-[#FCD4E2] rounded-xl p-5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#D9206E] flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <span className="font-mono font-bold uppercase text-[#C21A62] text-xs">Recommended Creator Spotlight</span>
                  <h3 className="font-display font-bold text-base text-[#171717]">{domain.primaryCreatorSpotlight.name}</h3>
                  <p className="text-base text-[#3F3D39] leading-relaxed">{domain.primaryCreatorSpotlight.reason}</p>
                  <p className="font-mono text-sm text-[#7F1030] pt-1">👉 Recommended start: {domain.primaryCreatorSpotlight.recommendedStart}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="space-y-5">
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-[#B45309]" />
              <h2 className="font-display font-bold text-2xl text-[#171717]">Realistic Projects to Build</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {domain.projectIdeas.map((project, idx) => (
                <div key={idx} className="card-level-2 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 text-xs font-mono uppercase font-bold bg-[#EEE9DE] text-[#171717] rounded">
                      {project.level} Project
                    </span>
                    <h3 className="font-display font-bold text-lg text-[#171717] mt-2">{project.title}</h3>
                    <p className="text-sm text-[#4B4A46] mt-2 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D8D0C2]">
                    <span className="font-mono text-xs uppercase text-[#625E56] block mb-1.5">Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-[#EEE9DE] text-[#171717] rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Previous / next domain */}
          <nav aria-label="Other domains" className="no-print grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#D8D0C2]">
            {prev ? (
              <a href={`/domain/${prev.id}`} className="card-level-2 card-shadow-hover rounded-xl p-4 block group">
                <span className="font-mono text-xs uppercase text-[#625E56] flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous domain
                </span>
                <span className="font-display font-bold text-base text-[#171717] group-hover:text-[#D9206E] mt-1 block">{prev.name}</span>
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a href={`/domain/${next.id}`} className="card-level-2 card-shadow-hover rounded-xl p-4 block group sm:text-right">
                <span className="font-mono text-xs uppercase text-[#625E56] flex items-center gap-1 sm:justify-end">
                  Next domain <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-display font-bold text-base text-[#171717] group-hover:text-[#D9206E] mt-1 block">{next.name}</span>
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
