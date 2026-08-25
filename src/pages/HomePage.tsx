import React from 'react'
import { ArrowRight, Compass, Map, BookOpen, Cpu, ShieldAlert, Users, Code, CheckSquare, Sparkles, Terminal, HelpCircle, Briefcase, Brain, Wrench, GraduationCap } from 'lucide-react'
import { softwareDomains, hardwareDomains, specializedDomains } from '../data/domains'
import { realityPrinciples } from '../data/realityCheck'

interface HomePageProps {
  onNavigate: (path: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Top Banner Ticker */}
      <div className="bg-[#171717] text-[#FFFDF8] px-4 py-2 text-xs font-mono border-b border-[#171717] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#087F73] animate-pulse" />
          <span className="text-[#D9206E] font-bold">NITH TECHNICAL MAP:</span>
          <span>Curated technical resources & senior field guide • Aug 2026 Edition</span>
        </div>
        <button
          onClick={() => onNavigate('/reality-check')}
          className="underline text-[#D9206E] hover:text-[#FFFDF8] transition-colors"
        >
          Senior Reality Check →
        </button>
      </div>

      {/* Hero Section (Section 5: Reduced Vertical Height by 20-30%) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 card-level-1 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDF0F5] border border-[#FCD4E2] rounded-full text-xs font-mono font-bold text-[#D9206E]">
                <Sparkles className="w-3.5 h-3.5" />
                NITH Student Technical Field Guide
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#171717] tracking-tight leading-tight">
                A Map for First Year.
              </h1>

              <p className="text-sm sm:text-base text-[#4B4A46] leading-relaxed max-w-2xl">
                A practical, honest guide to help NITH freshers decide{' '}
                <strong className="text-[#171717]">what to learn</strong>,{' '}
                <strong className="text-[#171717]">where to learn it from</strong>,{' '}
                <strong className="text-[#171717]">what to build</strong>, and{' '}
                <strong className="text-[#D9206E]">what traps to avoid</strong>.
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => onNavigate('/explore')}
                className="px-4 py-2.5 bg-[#171717] hover:bg-[#D9206E] text-[#FFFDF8] font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                Explore Domains
              </button>

              <button
                onClick={() => onNavigate('/roadmaps')}
                className="px-4 py-2.5 bg-[#EEE9DE] hover:bg-[#D8D0C2] text-[#171717] border border-[#D8D0C2] font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <Map className="w-4 h-4 text-[#2856B6]" />
                Explore Roadmaps
              </button>

              <button
                onClick={() => onNavigate('/resources')}
                className="px-4 py-2.5 bg-[#EEE9DE] hover:bg-[#D8D0C2] text-[#171717] border border-[#D8D0C2] font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-[#087F73]" />
                Browse Resources
              </button>

              <button
                onClick={() => onNavigate('/checklists')}
                className="px-4 py-2.5 bg-[#EEE9DE] hover:bg-[#D8D0C2] text-[#171717] border border-[#D8D0C2] font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <CheckSquare className="w-4 h-4 text-[#D97706]" />
                Checklists
              </button>
            </div>
          </div>

          {/* Static Technical Map Panel (Section 6) */}
          <div className="lg:col-span-4 card-level-2 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#D8D0C2] pb-2 mb-3">
                <Terminal className="w-4 h-4 text-[#D9206E]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Static Technical Map
                </span>
              </div>

              <div className="font-mono text-xs text-[#4B4A46] space-y-2 bg-[#EEE9DE]/60 p-3 rounded-lg border border-[#D8D0C2]">
                <div className="text-[#2856B6] font-bold">SOFTWARE & COMPUTING</div>
                <div className="pl-2 space-y-0.5 text-[11px]">
                  <div>├── AI / Machine Learning</div>
                  <div>├── Web Development</div>
                  <div>├── DSA & Competitive Prog.</div>
                  <div>├── Systems & Low-Level</div>
                  <div>└── DevOps & Cloud</div>
                </div>

                <div className="text-[#087F73] font-bold pt-2">HARDWARE & ENGINEERING</div>
                <div className="pl-2 space-y-0.5 text-[11px]">
                  <div>├── Embedded Systems</div>
                  <div>├── Robotics & ROS 2</div>
                  <div>├── VLSI & Semiconductor</div>
                  <div>├── Power & Electrical</div>
                  <div>└── Control & Automation</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[#77736B] leading-tight pt-2 border-t border-[#D8D0C2]">
              Equal focus on computing & physical engineering systems.
            </p>
          </div>
        </div>
      </section>

      {/* "Where do I start?" Section (Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-level-2 rounded-2xl p-6 space-y-6">
          <div>
            <span className="font-mono text-xs text-[#D9206E] font-bold uppercase tracking-wider block">
              Orientation Guide
            </span>
            <h2 className="font-display font-bold text-2xl text-[#171717] mt-1">
              Where do I start?
            </h2>
            <p className="text-xs text-[#77736B] mt-1">
              You do not need to know your specialization immediately. Pick the prompt that matches your current goal:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Option 1 */}
            <div
              onClick={() => onNavigate('/roadmaps')}
              className="bg-[#FFFDF8] border border-[#D8D0C2] p-4 rounded-xl hover:border-[#171717] hover:shadow-sm transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#2856B6]" />
                <h3 className="font-display font-bold text-sm text-[#171717] group-hover:text-[#D9206E]">
                  I want an internship
                </h3>
              </div>
              <p className="text-xs text-[#4B4A46]">Follow our structured 10-12 week internship roadmaps for AI/ML, Web Dev, or DSA.</p>
              <span className="font-mono text-[11px] font-bold text-[#2856B6] block pt-1">Explore Internship Roadmaps →</span>
            </div>

            {/* Option 2 */}
            <div
              onClick={() => onNavigate('/domain/dsa-cp')}
              className="bg-[#FFFDF8] border border-[#D8D0C2] p-4 rounded-xl hover:border-[#171717] hover:shadow-sm transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#2856B6]" />
                <h3 className="font-display font-bold text-sm text-[#171717] group-hover:text-[#D9206E]">
                  I like coding & logic
                </h3>
              </div>
              <p className="text-xs text-[#4B4A46]">Master problem solving with C++ STL, arrays, trees, dynamic programming, and contests.</p>
              <span className="font-mono text-[11px] font-bold text-[#2856B6] block pt-1">Start DSA & CP →</span>
            </div>

            {/* Option 3 */}
            <div
              onClick={() => onNavigate('/domain/ai-ml')}
              className="bg-[#FFFDF8] border border-[#D8D0C2] p-4 rounded-xl hover:border-[#171717] hover:shadow-sm transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#D9206E]" />
                <h3 className="font-display font-bold text-sm text-[#171717] group-hover:text-[#D9206E]">
                  I like AI & data
                </h3>
              </div>
              <p className="text-xs text-[#4B4A46]">Build intelligent models with Python, NumPy, Pandas, Scikit-Learn, PyTorch, and FastAPI.</p>
              <span className="font-mono text-[11px] font-bold text-[#D9206E] block pt-1">Start AI & ML →</span>
            </div>

            {/* Option 4 */}
            <div
              onClick={() => onNavigate('/domain/electronics-embedded')}
              className="bg-[#FFFDF8] border border-[#D8D0C2] p-4 rounded-xl hover:border-[#171717] hover:shadow-sm transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#087F73]" />
                <h3 className="font-display font-bold text-sm text-[#171717] group-hover:text-[#D9206E]">
                  I like physical hardware
                </h3>
              </div>
              <p className="text-xs text-[#4B4A46]">Wire microcontrollers (Arduino/ESP32), write Embedded C firmware, and design PCBs in KiCAD.</p>
              <span className="font-mono text-[11px] font-bold text-[#087F73] block pt-1">Explore Hardware & Embedded →</span>
            </div>

            {/* Option 5 */}
            <div
              onClick={() => onNavigate('/domain/research-computational')}
              className="bg-[#FFFDF8] border border-[#D8D0C2] p-4 rounded-xl hover:border-[#171717] hover:shadow-sm transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#D97706]" />
                <h3 className="font-display font-bold text-sm text-[#171717] group-hover:text-[#D9206E]">
                  I want academic research
                </h3>
              </div>
              <p className="text-xs text-[#4B4A46]">Learn literature review methodology, LaTeX paper formatting in Overleaf, and paper publishing.</p>
              <span className="font-mono text-[11px] font-bold text-[#D97706] block pt-1">Explore Academic Research →</span>
            </div>

            {/* Option 6 */}
            <div
              onClick={() => onNavigate('/explore')}
              className="bg-[#FFFDF8] border border-[#D8D0C2] p-4 rounded-xl hover:border-[#171717] hover:shadow-sm transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#77736B]" />
                <h3 className="font-display font-bold text-sm text-[#171717] group-hover:text-[#D9206E]">
                  I have no idea where to start
                </h3>
              </div>
              <p className="text-xs text-[#4B4A46]">Browse all 20 technical domains categorized by difficulty, prerequisites, and timeline.</p>
              <span className="font-mono text-[11px] font-bold text-[#171717] block pt-1">Browse All 20 Domains →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Descriptive Domain Entry Points (Section 8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-xl text-[#171717]">
            Descriptive Entry Points
          </h2>
          <button
            onClick={() => onNavigate('/explore')}
            className="text-xs font-mono text-[#D9206E] hover:underline"
          >
            View All Domains →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <button
            onClick={() => onNavigate('/domain/ai-ml')}
            className="p-4 bg-[#FFFDF8] border border-[#D8D0C2] hover:border-[#171717] rounded-xl text-left transition-all space-y-1 group"
          >
            <div className="font-bold text-[#171717] group-hover:text-[#D9206E]">AI & Machine Learning</div>
            <div className="text-[#77736B]">Build intelligent systems →</div>
          </button>

          <button
            onClick={() => onNavigate('/domain/web-development')}
            className="p-4 bg-[#FFFDF8] border border-[#D8D0C2] hover:border-[#171717] rounded-xl text-left transition-all space-y-1 group"
          >
            <div className="font-bold text-[#171717] group-hover:text-[#2856B6]">Web Development</div>
            <div className="text-[#77736B]">Build for the web →</div>
          </button>

          <button
            onClick={() => onNavigate('/domain/dsa-cp')}
            className="p-4 bg-[#FFFDF8] border border-[#D8D0C2] hover:border-[#171717] rounded-xl text-left transition-all space-y-1 group"
          >
            <div className="font-bold text-[#171717] group-hover:text-[#D97706]">DSA & CP</div>
            <div className="text-[#77736B]">Master problem solving →</div>
          </button>

          <button
            onClick={() => onNavigate('/domain/electronics-embedded')}
            className="p-4 bg-[#FFFDF8] border border-[#D8D0C2] hover:border-[#171717] rounded-xl text-left transition-all space-y-1 group"
          >
            <div className="font-bold text-[#171717] group-hover:text-[#087F73]">Hardware & Embedded</div>
            <div className="text-[#77736B]">Build physical systems →</div>
          </button>
        </div>
      </section>

      {/* 3 Major Groups (Section 9: Equal Visual Importance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Software & Computing */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D8D0C2] pb-2">
            <Code className="w-4 h-4 text-[#2856B6]" />
            <h2 className="font-display font-bold text-xl text-[#171717]">
              Software & Computing Domains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {softwareDomains.slice(0, 6).map((domain) => (
              <div
                key={domain.id}
                onClick={() => onNavigate(`/domain/${domain.id}`)}
                className="card-level-2 rounded-xl p-4 cursor-pointer hover:border-[#171717] transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#EEF3FB] text-[#2856B6]">
                    {domain.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-[#77736B]">Sequential Path</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#171717] group-hover:text-[#2856B6]">{domain.name}</h3>
                <p className="text-xs text-[#4B4A46] line-clamp-2">{domain.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Hardware & Engineering (EQUAL VISUAL IMPORTANCE) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D8D0C2] pb-2">
            <Cpu className="w-4 h-4 text-[#087F73]" />
            <h2 className="font-display font-bold text-xl text-[#171717]">
              Hardware & Engineering Domains
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#E8F5F4] text-[#087F73] font-bold rounded">
              Equal Importance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hardwareDomains.map((domain) => (
              <div
                key={domain.id}
                onClick={() => onNavigate(`/domain/${domain.id}`)}
                className="card-level-2 rounded-xl p-4 cursor-pointer hover:border-[#171717] transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#E8F5F4] text-[#087F73]">
                    {domain.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-[#77736B]">Sequential Path</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#171717] group-hover:text-[#087F73]">{domain.name}</h3>
                <p className="text-xs text-[#4B4A46] line-clamp-2">{domain.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Specialized / Emerging */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D8D0C2] pb-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <h2 className="font-display font-bold text-xl text-[#171717]">
              Specialized & Emerging Domains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specializedDomains.map((domain) => (
              <div
                key={domain.id}
                onClick={() => onNavigate(`/domain/${domain.id}`)}
                className="card-level-2 rounded-xl p-4 cursor-pointer hover:border-[#171717] transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#FEF8EC] text-[#D97706]">
                    {domain.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-[#77736B]">Sequential Path</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#171717] group-hover:text-[#D97706]">{domain.name}</h3>
                <p className="text-xs text-[#4B4A46] line-clamp-2">{domain.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Reality Check Highlight (Section 12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDF0F5] border border-[#FCD4E2] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#D9206E] uppercase">
                <ShieldAlert className="w-4 h-4" /> Senior Reality Check
              </div>
              <h3 className="font-display font-bold text-2xl text-[#171717]">
                Unvarnished Senior Truths & Common Fresher Traps
              </h3>
              <p className="text-xs text-[#4B4A46] max-w-2xl leading-relaxed">
                "{realityPrinciples[0].seniorQuote}"
              </p>
            </div>

            <button
              onClick={() => onNavigate('/reality-check')}
              className="px-5 py-3 bg-[#171717] text-[#FFFDF8] hover:bg-[#D9206E] font-semibold text-xs font-mono rounded-xl transition-all flex-shrink-0"
            >
              Read All Senior Truths →
            </button>
          </div>
        </div>
      </section>

      {/* NITH Ecosystem Preview (Section 21 & 22) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-level-2 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#087F73] font-bold uppercase tracking-wider block">
                NIT Hamirpur Culture
              </span>
              <h3 className="font-display font-bold text-xl text-[#171717] mt-0.5">
                Departmental Teams, Societies & Fests
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/nith-ecosystem')}
              className="px-4 py-2 bg-[#EEE9DE] hover:bg-[#171717] hover:text-[#FFFDF8] text-[#171717] font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Explore NITH Ecosystem
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-[#FFFDF8] border border-[#D8D0C2] rounded-lg">
              <span className="font-bold text-[#171717] block">OJAS</span>
              <span className="text-[#77736B]">EE Dept Team</span>
            </div>
            <div className="p-3 bg-[#FFFDF8] border border-[#D8D0C2] rounded-lg">
              <span className="font-bold text-[#171717] block">VIBHAV</span>
              <span className="text-[#77736B]">ECE Dept Team</span>
            </div>
            <div className="p-3 bg-[#FFFDF8] border border-[#D8D0C2] rounded-lg">
              <span className="font-bold text-[#171717] block">TEAM .EXE</span>
              <span className="text-[#77736B]">CSE Dept Team</span>
            </div>
            <div className="p-3 bg-[#FFFDF8] border border-[#D8D0C2] rounded-lg">
              <span className="font-bold text-[#171717] block">App Team NITH</span>
              <span className="text-[#77736B]">Core App/Web Club</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
