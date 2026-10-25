import { useLayoutEffect, useRef, useState } from 'react'

interface Props { routeKey: string }

export default function PageCurtain({ routeKey }: Props) {
  const [wipeKey, setWipeKey] = useState<string | null>(null)
  const prevKey = useRef(routeKey)

  // First paint shows the page straight away; later route changes get a quick wipe.
  // Layout effect so the curtain is up before the new page's first frame is painted.
  useLayoutEffect(() => {
    if (prevKey.current === routeKey) return
    prevKey.current = routeKey
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setWipeKey(routeKey)
  }, [routeKey])

  if (!wipeKey) return null

  return (
    <div
      key={wipeKey}
      className="page-curtain fixed inset-0 z-[9990] bg-charcoal origin-top pointer-events-none"
      onAnimationEnd={() => setWipeKey(null)}
    />
  )
}
