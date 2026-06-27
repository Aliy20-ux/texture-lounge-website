import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const VIDEO_1 = '/assets/videos/hero-loop.mp4'

const LINE_1 = ['Where', 'Craft']
const LINE_2 = ['Becomes', 'Culture']

function WordMask({ word, delay, accent = false }: { word: string; delay: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden leading-none pb-1">
      <motion.span
        className={`inline-block ${accent ? 'text-terracotta italic' : ''}`}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {word}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* ── DESKTOP ── fullscreen video with overlaid text */}
      <div className="hidden md:block relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          src={VIDEO_1}
          className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/80 z-10" />
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(18,10,6,0.65) 100%)' }} />
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 55% at 68% 35%, rgba(212,133,42,0.13) 0%, transparent 65%)', animation: 'lightBreathe 9s ease-in-out infinite' }} />

        {/* Logo + rings */}
        <div className="absolute inset-0 flex items-center justify-center pb-[28vh] z-20">
          <div className="relative flex items-center justify-center">
            <motion.div className="absolute rounded-full border border-cream/20"
              style={{ width: 280, height: 280 }}
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.19, 1, 0.22, 1] }} />
            <motion.div className="absolute rounded-full border border-amber/20"
              style={{ width: 200, height: 200 }}
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.55, ease: [0.19, 1, 0.22, 1] }} />
            <motion.img src="/assets/logo.jpg" alt="Texture Lounge"
              className="w-32 h-32 object-contain relative z-10"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.65, ease: [0.19, 1, 0.22, 1] }} />
          </div>
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 pb-20 px-16 text-center z-20">
          <motion.p className="font-geist text-xs tracking-[0.45em] uppercase text-cream/50 mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: started ? 1 : 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            Hair · Grooming · Ritual · Edinburgh
          </motion.p>
          <h1 className="font-heading font-light leading-[0.95] tracking-[-0.01em]">
            <span className="flex justify-center gap-[0.35em] text-[clamp(3rem,9vw,8rem)] text-cream mb-1">
              {started && LINE_1.map((w, i) => <WordMask key={w} word={w} delay={i * 0.12} />)}
            </span>
            <span className="flex justify-center gap-[0.35em] text-[clamp(3rem,9vw,8rem)] italic">
              {started && (<><WordMask word={LINE_2[0]} delay={0.28} /><WordMask word={LINE_2[1]} delay={0.4} accent /></>)}
            </span>
          </h1>
          <motion.div className="mx-auto mt-10 h-px bg-cream/20"
            initial={{ width: 0 }} animate={{ width: started ? 80 : 0 }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.76, 0, 0.24, 1] }} />
          <motion.p className="mt-6 font-geist font-light text-sm text-cream/60 max-w-sm mx-auto leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: started ? 1 : 0, y: started ? 0 : 16 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.19, 1, 0.22, 1] }}>
            A salon where every detail is considered.<br />
            Expert stylists. Unhurried ritual. Edinburgh.
          </motion.p>
          <motion.div className="mt-10 flex flex-col items-center"
            initial={{ opacity: 0 }} animate={{ opacity: started ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.4 }}>
            <div className="w-px h-10 bg-cream/25" style={{ animation: 'scrollLine 2.2s ease-in-out infinite' }} />
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE ── full video + text, both on screen */}
      <div className="md:hidden flex flex-col" style={{ minHeight: '100dvh' }}>

        {/* Video — exact 16:9 container so zero cropping */}
        <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <video
            autoPlay muted loop playsInline preload="auto"
            src={VIDEO_1}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/80" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 55% at 68% 35%, rgba(212,133,42,0.15) 0%, transparent 65%)', animation: 'lightBreathe 9s ease-in-out infinite' }} />

          {/* Logo centred on video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <motion.div className="absolute rounded-full border border-cream/20"
                style={{ width: 'min(48vw, 180px)', height: 'min(48vw, 180px)' }}
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.19, 1, 0.22, 1] }} />
              <motion.div className="absolute rounded-full border border-amber/20"
                style={{ width: 'min(33vw, 125px)', height: 'min(33vw, 125px)' }}
                initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.45, ease: [0.19, 1, 0.22, 1] }} />
              <motion.img src="/assets/logo.jpg" alt="Texture Lounge"
                className="w-14 h-14 object-contain relative z-10"
                initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.55, ease: [0.19, 1, 0.22, 1] }} />
            </div>
          </div>
        </div>

        {/* Text — fills remaining viewport height */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-6">
          <motion.p
            className="font-geist text-[0.55rem] tracking-[0.4em] uppercase text-cream/45 mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: started ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}>
            Hair · Grooming · Ritual · Edinburgh
          </motion.p>

          <h1 className="font-heading font-light leading-[0.92] tracking-[-0.01em] mb-4">
            <span className="flex justify-center gap-[0.3em] text-[clamp(2.4rem,11vw,3.5rem)] text-cream mb-0.5">
              {started && LINE_1.map((w, i) => <WordMask key={w} word={w} delay={0.35 + i * 0.12} />)}
            </span>
            <span className="flex justify-center gap-[0.3em] text-[clamp(2.4rem,11vw,3.5rem)] italic">
              {started && (<>
                <WordMask word={LINE_2[0]} delay={0.62} />
                <WordMask word={LINE_2[1]} delay={0.74} accent />
              </>)}
            </span>
          </h1>

          <motion.div className="h-px bg-cream/20 mb-5"
            initial={{ width: 0 }} animate={{ width: started ? 48 : 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: [0.76, 0, 0.24, 1] }} />

          <motion.p
            className="font-geist font-light text-[0.75rem] text-cream/55 leading-relaxed tracking-wide mb-6 max-w-[260px]"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: started ? 1 : 0, y: started ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}>
            A salon where every detail is considered.<br />
            Expert stylists. Unhurried ritual.
          </motion.p>

          <motion.a
            href="#booking"
            className="flex items-center gap-2.5 bg-terracotta text-cream font-geist text-[0.65rem] font-medium tracking-[0.2em] uppercase px-7 py-3.5 rounded-full shadow-[0_6px_24px_rgba(176,64,48,0.45)]"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: started ? 1 : 0, y: started ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 1.35, ease: [0.19, 1, 0.22, 1] }}>
            Reserve Now
          </motion.a>
        </div>
      </div>

      <style>{`
        @keyframes lightBreathe {
          0%,100% { opacity:0.7; } 50% { opacity:1; }
        }
        @keyframes scrollLine {
          0%,100% { transform:scaleY(1); opacity:0.3; }
          50%      { transform:scaleY(0.4); opacity:0.8; }
        }
      `}</style>
    </>
  )
}
