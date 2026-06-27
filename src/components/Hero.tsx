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
    <div className="relative" style={{ height: '100dvh' }}>
      <div className="w-full h-full overflow-hidden relative">

        {/* ── MOBILE ONLY: blurred background fill (same technique as Instagram/TikTok) ── */}
        {/* This video is blurred + scaled to fill the portrait bars above/below the main frame */}
        <video
          autoPlay muted loop playsInline preload="auto"
          src={VIDEO_1}
          aria-hidden="true"
          className="md:hidden absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(28px) brightness(0.35) saturate(0.7)', transform: 'scale(1.15)' }}
        />

        {/* ── MAIN VIDEO ──
            Mobile: object-contain — full 16:9 frame visible, centred over the blurred bg
            Desktop: object-cover + slight scale — cinematic fullscreen fill               */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          src={VIDEO_1}
          className="absolute inset-0 w-full h-full object-contain md:object-cover md:scale-[1.04]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink/75 z-10" />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(18,10,6,0.6) 100%)' }} />

        {/* Warm amber bleed */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 55% at 68% 35%, rgba(212,133,42,0.13) 0%, transparent 65%)',
            animation: 'lightBreathe 9s ease-in-out infinite',
          }} />

        {/* Logo + rings */}
        <div className="absolute inset-0 flex items-center justify-center pb-[28vh] z-20">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border border-cream/20"
              style={{ width: 'min(72vw, 280px)', height: 'min(72vw, 280px)' }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            />
            <motion.div
              className="absolute rounded-full border border-amber/20"
              style={{ width: 'min(52vw, 200px)', height: 'min(52vw, 200px)' }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
            />
            <motion.img
              src="/assets/logo.jpg"
              alt="Texture Lounge"
              className="w-20 h-20 md:w-32 md:h-32 object-contain relative z-10"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.65, ease: [0.19, 1, 0.22, 1] }}
            />
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-20 px-6 md:px-16 text-center z-20">

          <motion.p
            className="font-geist text-[0.55rem] md:text-xs tracking-[0.4em] uppercase text-cream/50 mb-5 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: started ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Hair · Grooming · Ritual · Edinburgh
          </motion.p>

          <h1 className="font-heading font-light leading-[0.92] tracking-[-0.01em]">
            <span className="flex justify-center gap-[0.3em] text-[clamp(2.6rem,10vw,8rem)] text-cream mb-0.5">
              {started && LINE_1.map((w, i) => (
                <WordMask key={w} word={w} delay={i * 0.12} />
              ))}
            </span>
            <span className="flex justify-center gap-[0.3em] text-[clamp(2.6rem,10vw,8rem)] italic">
              {started && (
                <>
                  <WordMask word={LINE_2[0]} delay={0.28} />
                  <WordMask word={LINE_2[1]} delay={0.4} accent />
                </>
              )}
            </span>
          </h1>

          <motion.div
            className="mx-auto mt-5 md:mt-10 h-px bg-cream/20"
            initial={{ width: 0 }}
            animate={{ width: started ? 60 : 0 }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.p
            className="mt-4 md:mt-6 font-geist font-light text-[0.72rem] md:text-sm text-cream/60 max-w-xs mx-auto leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 16 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.19, 1, 0.22, 1] }}
          >
            A salon where every detail is considered.<br />
            Expert stylists. Unhurried ritual. Edinburgh.
          </motion.p>

          {/* Mobile Reserve CTA */}
          <motion.div
            className="mt-6 flex md:hidden justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 10 }}
            transition={{ duration: 0.8, delay: 1.25, ease: [0.19, 1, 0.22, 1] }}
          >
            <a
              href="#booking"
              className="flex items-center gap-2.5 bg-terracotta text-cream font-geist text-[0.65rem] font-medium tracking-[0.2em] uppercase px-7 py-3.5 rounded-full shadow-[0_6px_24px_rgba(176,64,48,0.45)]"
            >
              Reserve Now
            </a>
          </motion.div>

          {/* Desktop scroll indicator */}
          <motion.div
            className="mt-8 md:mt-10 hidden md:flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: started ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="w-px h-10 bg-cream/25" style={{ animation: 'scrollLine 2.2s ease-in-out infinite' }} />
          </motion.div>
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
    </div>
  )
}
