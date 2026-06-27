import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BookingModal from './BookingModal'

export default function Booking() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="booking" className="relative py-32 md:py-44 px-5 md:px-12 overflow-hidden">

      {/* Video background */}
      <video
        autoPlay muted loop playsInline preload="auto"
        src="/assets/videos/hero-loop.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'saturate(0.4) brightness(0.25)' }}
      />

      {/* Overlay — deep ink tint so text stays readable */}
      <div className="absolute inset-0 bg-ink/75" />

      {/* Kinetic ghost text */}
      <div className="absolute bottom-[-2rem] left-[-1rem] font-heading text-[clamp(6rem,22vw,24rem)] font-light italic text-terracotta/[0.06] leading-none pointer-events-none select-none whitespace-nowrap z-[1]">
        Reserve
      </div>

      {/* Vertical line decoration */}
      <div className="absolute left-1/2 top-0 w-px h-16 bg-gradient-to-b from-cream/0 to-cream/10 z-[2]" />

      <div ref={ref} className="relative max-w-2xl mx-auto text-center z-[3]">

        <motion.p
          className="font-geist text-sage text-[0.6rem] tracking-[0.4em] uppercase mb-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
        >
          Reserve Your Chair
        </motion.p>

        <div className="overflow-hidden mb-10">
          <motion.h2
            className="font-heading text-cream text-5xl md:text-7xl lg:text-8xl font-light italic leading-[0.95]"
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            Your<br />
            appointment<br />
            <em className="text-terracotta not-italic">awaits.</em>
          </motion.h2>
        </div>

        <motion.p
          className="font-geist text-cream/50 text-sm leading-relaxed mb-14 max-w-sm mx-auto font-light"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          By appointment only. Your time is protected.
          Book directly with one of our master barbers.
        </motion.p>

        <motion.div
          className="flex flex-col gap-3 justify-center px-0"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="group w-full sm:w-auto sm:inline-flex inline-flex items-center justify-center gap-3 bg-terracotta hover:bg-rust text-cream font-geist text-xs font-medium tracking-[0.18em] uppercase px-10 py-4 md:py-5 transition-colors duration-400 rounded-sm"
          >
            Book Online
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <a
            href="tel:+442000000000"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-cream/15 hover:border-cream/45 text-cream/60 hover:text-cream font-geist text-xs font-medium tracking-[0.18em] uppercase px-10 py-4 md:py-5 transition-all duration-400 rounded-sm"
          >
            Call Us
          </a>
        </motion.div>

        <motion.p
          className="font-geist text-cream/25 text-[0.6rem] tracking-[0.15em] mt-12 leading-[2]"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.85 }}
        >
          Mon – Wed 09:00–19:00 · Thu – Fri 09:00–20:00<br />
          Sat 09:00–19:00 · Sun 10:00–17:00
        </motion.p>
      </div>
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
