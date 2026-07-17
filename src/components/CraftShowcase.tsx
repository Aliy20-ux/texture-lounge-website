import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const MP4  = '/assets/videos/salon-feature-web.mp4'
const WEBM = '/assets/videos/salon-feature-web.webm'

export default function CraftShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Section label ──
  const labelOp = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0])

  // ── Line 1: THE CRAFT ──
  const l1Op = useTransform(scrollYProgress, [0.04, 0.15, 0.34, 0.44], [0, 1, 1, 0])
  const l1Y  = useTransform(scrollYProgress, [0.04, 0.15], ['52px', '0px'])

  // ── Line 2: PRECISION ──
  const l2Op = useTransform(scrollYProgress, [0.46, 0.57, 0.76, 0.86], [0, 1, 1, 0])
  const l2Y  = useTransform(scrollYProgress, [0.46, 0.57], ['52px', '0px'])

  // ── Line 3: CTA ──
  const l3Op = useTransform(scrollYProgress, [0.88, 0.95], [0, 1])
  const l3Y  = useTransform(scrollYProgress, [0.88, 0.95], ['28px', '0px'])

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 h-svh overflow-hidden flex items-center justify-center">

        {/* ── VIDEO — full-bleed ── */}
        <div className="absolute inset-0">
          <video
            autoPlay muted loop playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(1.18) brightness(0.86) contrast(1.06)' }}
          >
            <source src={WEBM} type="video/webm" />
            <source src={MP4}  type="video/mp4"  />
          </video>

          {/* Dark gradient over video for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(165deg, rgba(18,10,6,0.45) 0%, rgba(18,10,6,0.12) 45%, rgba(18,10,6,0.72) 100%)',
            }}
          />
        </div>

        {/* ── SECTION LABEL ── */}
        <motion.p
          className="absolute top-9 left-7 md:top-11 md:left-14 z-30 font-geist text-[0.44rem] tracking-[0.5em] uppercase text-cream/38 pointer-events-none"
          style={{ opacity: labelOp }}
        >
          Definition · Texture Lounge
        </motion.p>

        {/* ── TEXT 1: THE CRAFT ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          style={{ opacity: l1Op }}
        >
          <motion.h2
            className="font-heading font-light text-cream text-center select-none"
            style={{
              fontSize: 'clamp(4.5rem, 17vw, 13.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.025em',
              y: l1Y,
            }}
          >
            The&nbsp;Texture
          </motion.h2>
        </motion.div>

        {/* ── TEXT 2: PRECISION (italic, sage) ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none gap-4"
          style={{ opacity: l2Op }}
        >
          <motion.h2
            className="font-heading italic font-light text-sage text-center select-none"
            style={{
              fontSize: 'clamp(4rem, 15vw, 11.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.025em',
              y: l2Y,
            }}
          >
            Defined
          </motion.h2>
          <motion.p
            className="font-geist text-cream/35 text-[0.46rem] tracking-[0.5em] uppercase"
            style={{ y: l2Y }}
          >
            Edinburgh · Est. 2026
          </motion.p>
        </motion.div>

        {/* ── TEXT 3: BOOK CTA ── */}
        <motion.div
          className="absolute bottom-10 md:bottom-14 left-0 right-0 z-30 flex justify-center"
          style={{ opacity: l3Op, y: l3Y }}
        >
          <a
            href="#booking"
            className="group font-geist text-[0.58rem] md:text-[0.65rem] tracking-[0.38em] uppercase text-cream/55 hover:text-cream transition-colors duration-400 flex items-center gap-4"
          >
            Reserve your appointment
            <span className="block w-8 h-px bg-current transition-[width] duration-500 group-hover:w-16" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
