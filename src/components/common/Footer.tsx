import React from 'react'
import { SITE_CONFIG } from '../../data/config'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFFDF8] border-t border-[#D8D0C2] py-10 mt-16 text-[#4B4A46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#171717] text-[#FF4D94] font-display font-bold flex items-center justify-center text-xs">
                N
              </div>
              <span className="font-display font-bold text-base text-[#171717]">
                {SITE_CONFIG.title}
              </span>
            </div>
            <p className="text-sm text-[#625E56] leading-relaxed max-w-md">
              {SITE_CONFIG.subtitle} — A practical, honest, student-first technical map for National Institute of Technology Hamirpur students.
            </p>
            {/* Author Credit */}
            <p className="font-mono text-xs text-[#171717] font-semibold mt-3">
              Created by <span className="text-[#D9206E]">{SITE_CONFIG.authorName}</span>
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#171717] mb-3">
              Quick Entry
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/explore" className="hover:text-[#D9206E] transition-colors">
                  Explore Domains
                </a>
              </li>
              <li>
                <a href="/roadmaps" className="hover:text-[#D9206E] transition-colors">
                  Goal Roadmaps
                </a>
              </li>
              <li>
                <a href="/resources" className="hover:text-[#D9206E] transition-colors">
                  Resource Directory
                </a>
              </li>
              <li>
                <a href="/checklists" className="hover:text-[#D9206E] transition-colors">
                  First-Year Flowchart
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#171717] mb-3">
              NITH & Reality
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/reality-check" className="hover:text-[#D9206E] transition-colors">
                  Senior Reality Check
                </a>
              </li>
              <li>
                <a href="/nith-ecosystem" className="hover:text-[#D9206E] transition-colors">
                  Departmental Teams & Clubs
                </a>
              </li>
              <li>
                <a href="/domain/ai-ml" className="hover:text-[#D9206E] transition-colors">
                  Start AI / ML
                </a>
              </li>
              <li>
                <a href="/domain/electronics-embedded" className="hover:text-[#D9206E] transition-colors">
                  Start Electronics & Embedded
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#D8D0C2] flex flex-col sm:flex-row items-center justify-between text-sm text-[#625E56] gap-4">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.title} • {SITE_CONFIG.subtitle}
          </p>
          <p className="font-mono text-[11px]">
            Created by {SITE_CONFIG.authorName} • {SITE_CONFIG.edition}
          </p>
        </div>
      </div>
    </footer>
  )
}
