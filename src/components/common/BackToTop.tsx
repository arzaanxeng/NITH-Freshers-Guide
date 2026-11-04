import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="no-print fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full bg-[#171717] text-[#FFFDF8] hover:bg-[#D9206E] shadow-lg flex items-center justify-center transition-colors"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
