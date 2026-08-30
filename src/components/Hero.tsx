import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import { isOpenNow } from '../data/business'

const VIDEO_WEBM = '/assets/videos/dola-removal.webm'
const VIDEO_MP4  = '/assets/videos/dola-removal.mp4'

// ── Hero ─────────────────────────────────────────────────────────────────────
const revealVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  show:   { clipPath: 'inset(0 0 0%   0)', opacity: 1 },
}

export default function Hero() {
  const [started, setStarted] = useState(false)
  const { openBooking } = useBooking()
  const status = isOpenNow()

  // Parallax: video moves slower than scroll
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 350)
    return () => clearTimeout(t)
  }, [])

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
          Edinburgh · Est. 2026 · Premium Curly Hair Salon
        </motion.p>

        {/* ── HEADLINE — the actual logo wordmark ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-12 -mt-4 md:-mt-6">
          <motion.div
            className="overflow-hidden leading-none"
            variants={revealVariants}
            initial="hidden"
            animate={started ? 'show' : 'hidden'}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src="/assets/logo-wordmark.png"
              alt="Texture Lounge"
              className="h-auto"
              style={{ width: 'clamp(280px, 62vw, 760px)' }}
            />
          </motion.div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-7 md:pb-9">

          <div className="flex items-center justify-between px-6 md:px-12 pt-4 md:pt-5 border-t border-cream/10 mx-6 md:mx-12">

            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.open ? 'bg-sage' : 'bg-terracotta'}`} />
              <p className="font-geist text-[0.44rem] md:text-[0.5rem] text-cream/45 tracking-[0.24em] uppercase">
                {status.label}
              </p>
            </motion.div>

            <motion.button
              onClick={openBooking}
              className="flex items-center gap-2 bg-sage hover:bg-sage/80 text-charcoal font-geist text-[0.58rem] md:text-[0.62rem] font-semibold tracking-[0.22em] uppercase px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-colors duration-300 shadow-[0_4px_20px_rgba(123,174,142,0.35)]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: started ? 1 : 0, y: started ? 0 : 6 }}
              transition={{ duration: 0.9, delay: 1.6 }}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  )
}
