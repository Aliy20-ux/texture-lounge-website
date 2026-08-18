import { useEffect, useRef, useState } from 'react'

interface Props { routeKey: string }

export default function PageCurtain({ routeKey }: Props) {
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const firstRun = useRef(true)

  useEffect(() => {
    // Skip the wipe-in on first mount if this is the very first paint of the app —
    // still shows a brief wipe-out for a considered first impression.
    if (firstRun.current) {
      firstRun.current = false
      const t = setTimeout(() => setPhase('out'), 300)
      return () => clearTimeout(t)
    }

    setPhase('in')
    const t = setTimeout(() => setPhase('out'), 300)
    return () => clearTimeout(t)
  }, [routeKey])

  return (
    <div
      className="fixed inset-0 z-[9990] bg-charcoal origin-top pointer-events-none"
      style={{
        transform:  phase === 'out' ? 'scaleY(0)' : 'scaleY(1)',
        transition: 'transform 0.9s cubic-bezier(0.76,0,0.24,1)',
      }}
    />
  )
}
