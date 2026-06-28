import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const VIDEO_WEBM = '/assets/videos/dola-removal.webm'
const VIDEO_MP4  = '/assets/videos/dola-removal.mp4'

const MARQUEE = 'PRECISION CUTS · HOT TOWEL SHAVE · BEARD ARCHITECTURE · COLOUR & TONE · EDINBURGH · '

// ── Character scramble hook ─────────────────────────────────────────────────
const CHARS = 'abcdefghijklmnopqrstuvwxyz'

function useScramble(finalText: string, trigger: boolean, delayMs = 0) {
  const [display, setDisplay] = useState(() =>
    finalText.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
  )
  const doneRef = useRef(false)

  useEffect(() => {
    if (!trigger || doneRef.current) return
    const timeout = setTimeout(() => {
      doneRef.current = true
      const chars = finalText.split('')
      const FRAMES = 32
      let frame = 0

      const id = setInterval(() => {
        frame++
        const locked = Math.floor((frame / FRAMES) * chars.length)
        setDisplay(
          chars.map((c, i) => {
            if (c === ' ') return ' '
            if (i < locked) return c
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        if (frame >= FRAMES) { setDisplay(finalText); clearInterval(id) }
      }, 42)

      return () => clearInterval(id)
    }, delayMs)

    return () => clearTimeout(timeout)
  }, [trigger, finalText, delayMs])

  return display
}

// ── Marquee strip ───────────────────────────────────────────────────────────
function Marquee() {
  return (
    <div className="w-full overflow-hidden border-t border-cream/10 pt-4">
      <div
        className="whitespace-nowrap font-geist text-[0.44rem] md:text-[0.48rem] tracking-[0.4em] uppercase text-cream/25"
        style={{ animation: 'marqueeScroll 28s linear infinite' }}
      >
        {MARQUEE.repeat(8)}
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
const revealVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  show:   { clipPath: 'inset(0 0 0%   0)', opacity: 1 },
}

export default function Hero() {
  const [started, setStarted] = useState(false)

  // Parallax: video moves slower than scroll
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 350)
    return () => clearTimeout(t)
  }, [])

  // Character scramble on the two big words (triggers after clip-path reveals them)
  const quietText  = useScramble('quiet',  started, 900)
  const luxuryText = useScramble('luxury', started, 1100)

  return (
    <div ref={heroRef} className="relative" style={{ height: '100dvh' }}>
      <div className="w-full h-full overflow-hidden relative">

        {/* ── VIDEO — parallax ── */}
        <motion.video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-[1.18]"
          style={{
            y: videoY,
            filter: 'saturate(1.18) sepia(0.06) brightness(0.88)',
          }}
        >
          <source src={VIDEO_WEBM} type="video/webm" />
          <source src={VIDEO_MP4}  type="video/mp4"  />
        </motion.video>

        {/* Directional gradient */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(170deg, rgba(18,10,6,0.72) 0%, rgba(18,10,6,0.08) 42%, rgba(18,10,6,0.78) 100%)' }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 32%, rgba(18,10,6,0.62) 100%)' }}
        />
        {/* Amber warmth */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 45% 50% at 72% 30%, rgba(212,133,42,0.12) 0%, transparent 70%)',
            animation: 'breathe 10s ease-in-out infinite',
          }}
        />

        {/* ── TOP LABEL ── */}
        <motion.p
          className="absolute top-24 md:top-28 left-0 right-0 z-20 text-center font-geist text-[0.42rem] md:text-[0.48rem] tracking-[0.55em] uppercase text-cream/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          Edinburgh · Est. 2026 · Premium Grooming
        </motion.p>

        {/* ── HEADLINE — stacked, massive ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-12 -mt-6 md:-mt-10">

          {/* Prelude line */}
          <motion.div
            className="overflow-hidden mb-1 md:mb-2"
            variants={revealVariants}
            initial="hidden"
            animate={started ? 'show' : 'hidden'}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="font-heading italic font-light text-cream/60 text-[clamp(1rem,3.2vw,2rem)] tracking-[0.04em] text-center">
              where craft meets
            </p>
          </motion.div>

          {/* QUIET — scramble on reveal */}
          <motion.div
            className="overflow-hidden leading-none"
            variants={revealVariants}
            initial="hidden"
            animate={started ? 'show' : 'hidden'}
            transition={{ duration: 1.1, delay: 0.74, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1
              className="font-heading font-light text-cream uppercase tracking-[-0.01em] text-center"
              style={{ fontSize: 'clamp(5.5rem, 20vw, 14.5rem)', lineHeight: 0.9 }}
            >
              {quietText}
            </h1>
          </motion.div>

          {/* LUXURY — scramble on reveal */}
          <motion.div
            className="overflow-hidden leading-none"
            variants={revealVariants}
            initial="hidden"
            animate={started ? 'show' : 'hidden'}
            transition={{ duration: 1.1, delay: 0.92, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1
              className="font-heading italic font-light text-sage tracking-[-0.01em] text-center"
              style={{ fontSize: 'clamp(4.8rem, 18vw, 12.5rem)', lineHeight: 0.9 }}
            >
              {luxuryText}
            </h1>
          </motion.div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-7 md:pb-9">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: started ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 1.5 }}
          >
            <Marquee />
          </motion.div>

          <div className="flex items-center justify-between px-6 md:px-12 mt-4 md:mt-5">

            <motion.p
              className="font-geist text-[0.44rem] md:text-[0.5rem] text-cream/28 tracking-[0.28em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              55.9533° N · 3.1883° W
            </motion.p>

            <motion.a
              href="#booking"
              className="flex items-center gap-2 bg-sage hover:bg-sage/80 text-charcoal font-geist text-[0.58rem] md:text-[0.62rem] font-semibold tracking-[0.22em] uppercase px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-colors duration-300 shadow-[0_4px_20px_rgba(123,174,142,0.35)]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: started ? 1 : 0, y: started ? 0 : 6 }}
              transition={{ duration: 0.9, delay: 1.6 }}
            >
              Book a Visit
            </motion.a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1;   }
        }
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
