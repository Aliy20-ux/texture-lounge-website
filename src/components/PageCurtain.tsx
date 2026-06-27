import { useEffect, useState } from 'react'

export default function PageCurtain() {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 300)
    const t2 = setTimeout(() => setPhase('gone'), 1100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      className="fixed inset-0 z-[9990] bg-ink origin-top pointer-events-none"
      style={{
        transform:  phase === 'out' ? 'scaleY(0)' : 'scaleY(1)',
        transition: 'transform 0.9s cubic-bezier(0.76,0,0.24,1)',
      }}
    />
  )
}
