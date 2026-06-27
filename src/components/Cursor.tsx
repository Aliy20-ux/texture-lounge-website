import { useEffect, useRef, useState } from 'react'

// Hide on touch devices — only show on pointer:fine (mouse)
const hasPointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

export default function Cursor() {
  if (!hasPointer) return null
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [hovered,  setHovered]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const hoveredRef  = useRef(false)
  const clickingRef = useRef(false)

  useEffect(() => {
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onDown = () => { setClicking(true);  clickingRef.current = true  }
    const onUp   = () => { setClicking(false); clickingRef.current = false }

    const enter = () => { setHovered(true);  hoveredRef.current = true  }
    const leave = () => { setHovered(false); hoveredRef.current = false }

    const addListeners = (el: Element) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    }
    document.querySelectorAll('a, button, [role="button"]').forEach(addListeners)

    const obs = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(addListeners)
    })
    obs.observe(document.body, { childList: true, subtree: true })

    const loop = () => {
      // Ring follows with smooth lag
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11

      const dot  = dotRef.current
      const ring = ringRef.current
      const glow = glowRef.current

      if (dot)  dot.style.transform  = `translate(${mx}px,${my}px)`
      if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`
      if (glow) glow.style.transform = `translate(${rx}px,${ry}px)`

      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      obs.disconnect()
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
    }
  }, [])

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{ transform: 'translate(-200px,-200px)' }}
      >
        <div
          className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
          style={{
            width:      clicking ? 3 : 5,
            height:     clicking ? 3 : 5,
            background: hovered ? '#B04030' : '#EDE0CC',
            boxShadow:  hovered ? '0 0 6px rgba(176,64,48,0.6)' : 'none',
          }}
        />
      </div>

      {/* Ring — lags, reacts strongly on hover/click */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
        style={{ transform: 'translate(-200px,-200px)' }}
      >
        <div
          className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,box-shadow] duration-350 ease-out"
          style={{
            width:      clicking ? 16 : hovered ? 56 : 34,
            height:     clicking ? 16 : hovered ? 56 : 34,
            border:     hovered
              ? '1.5px solid rgba(176,64,48,0.8)'
              : clicking
              ? '1px solid rgba(237,224,204,0.7)'
              : '1px solid rgba(237,224,204,0.3)',
            boxShadow:  hovered
              ? '0 0 20px rgba(176,64,48,0.18), inset 0 0 10px rgba(176,64,48,0.05)'
              : 'none',
          }}
        />
      </div>

      {/* Soft glow blob — follows ring, only on hover */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none will-change-transform transition-opacity duration-400"
        style={{
          transform: 'translate(-200px,-200px)',
          opacity: hovered ? 1 : 0,
        }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, rgba(176,64,48,0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    </>
  )
}
