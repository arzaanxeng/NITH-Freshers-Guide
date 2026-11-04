import React from 'react'
import { Compass, Home } from 'lucide-react'

export const NotFoundPage: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9206E]">404</span>
    <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#171717]">We couldn't find that page</h1>
    <p className="text-base text-[#4B4A46] leading-relaxed">
      The link may be old or mistyped. Try the domain catalog, or press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-[#EEE9DE] border border-[#D8D0C2] rounded">/</kbd> to search the whole guide.
    </p>
    <div className="flex flex-wrap justify-center gap-3 pt-2">
      <a href="/explore" className="px-4 py-2.5 bg-[#171717] hover:bg-[#D9206E] text-[#FFFDF8] font-semibold text-sm rounded-lg transition-colors inline-flex items-center gap-2">
        <Compass className="w-4 h-4" /> Explore domains
      </a>
      <a href="/" className="px-4 py-2.5 bg-[#EEE9DE] hover:bg-[#D8D0C2] border border-[#D8D0C2] text-[#171717] font-semibold text-sm rounded-lg transition-colors inline-flex items-center gap-2">
        <Home className="w-4 h-4" /> Home
      </a>
    </div>
  </div>
)
