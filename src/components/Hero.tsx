import { useEffect, useRef, useState } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import { isOpenNow } from '../data/business'
import { useVideoInView } from '../lib/useVideoInView'

// The colour grade and the 0.6s crossfade at the loop seam are baked into these files,
// so a single plain <video loop> plays seamlessly with no CSS filter or JS per frame.
// Phones get a 720p encode — they only ever show a narrow slice of the frame.
const VIDEO_DESKTOP = '/assets/videos/hero-1080.mp4'
const VIDEO_MOBILE  = '/assets/videos/hero-720.mp4'
const POSTER        = '/assets/hero-poster.jpg'
const MOBILE_QUERY = '(max-width: 767px)'

// ── Hero ─────────────────────────────────────────────────────────────────────
const revealVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  show:   { clipPath: 'inset(0 0 0%   0)', opacity: 1 },
}

export default function Hero() {
  const { openBooking } = useBooking()
  const status = isOpenNow()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useVideoInView(videoRef)

  // object-cover exactly fills the container height on mobile (no vertical
  // slack), so any parallax shift would reveal an edge — skip it there.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Parallax: video moves slower than scroll
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '22%'])

  return (
    <div ref={heroRef} className="relative" style={{ height: '100dvh' }}>
      <div className="w-full h-full overflow-hidden relative" style={{ backgroundColor: '#120A06' }}>

        {/* ── VIDEO — parallax, seamless pre-rendered loop ── */}
        <m.video
          ref={videoRef}
          muted loop playsInline preload="auto"
          poster={POSTER}
          className="absolute inset-0 w-full h-full object-cover object-[42%_50%] md:object-center scale-[1.03] md:scale-[1.18]"
          style={{ y: videoY }}
        >
          <source src={VIDEO_MOBILE} type="video/mp4" media={MOBILE_QUERY} />
          <source src={VIDEO_DESKTOP} type="video/mp4" />
        </m.video>

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
        <m.p
          className="absolute top-32 md:top-36 left-0 right-0 z-20 text-center font-geist text-[0.42rem] md:text-[0.48rem] tracking-[0.55em] uppercase text-cream/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Edinburgh · Est. 2026 · Premium Curly Hair Salon
        </m.p>

        {/* ── HEADLINE — the actual logo wordmark ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-12 -mt-4 md:-mt-6">
          <m.div
            className="overflow-hidden leading-none"
            variants={revealVariants}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src="/assets/logo-wordmark.webp"
              alt="Texture Lounge"
              className="h-auto"
              style={{ width: 'clamp(280px, 62vw, 760px)' }}
            />
          </m.div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-7 md:pb-9">

          <div className="flex items-center justify-between px-6 md:px-12 pt-4 md:pt-5 border-t border-cream/10 mx-6 md:mx-12">

            <m.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.open ? 'bg-sage' : 'bg-terracotta'}`} />
              <p className="font-geist text-[0.44rem] md:text-[0.5rem] text-cream/45 tracking-[0.24em] uppercase">
                {status.label}
              </p>
            </m.div>

            <m.button
              onClick={openBooking}
              className="flex items-center gap-2 bg-sage hover:bg-sage/80 text-charcoal font-geist text-[0.58rem] md:text-[0.62rem] font-semibold tracking-[0.22em] uppercase px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-colors duration-300 shadow-[0_4px_20px_rgba(123,174,142,0.35)]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              Book Now
            </m.button>
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
