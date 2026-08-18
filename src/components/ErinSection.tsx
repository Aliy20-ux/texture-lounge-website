import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ErinSection() {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section ref={ref} className="bg-cream overflow-hidden">
      <div className="grid md:grid-cols-[3fr_2fr] min-h-[80vh]">

        {/* Video — full-bleed, no letterboxing */}
        <div className="relative overflow-hidden min-h-[55vw] md:min-h-0">
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <video
              autoPlay muted loop playsInline preload="auto"
              poster="/assets/erin-street-cut-poster.jpg"
              aria-label="Erin Strange cutting a client's hair on location in Edinburgh"
              className="w-full h-full object-cover object-[center_28%] md:object-top"
            >
              <source src="/assets/videos/erin-street-cut.webm" type="video/webm" />
              <source src="/assets/videos/erin-street-cut.mp4"  type="video/mp4"  />
            </video>
          </motion.div>

          {/* Award badge floating on the photo */}
          <motion.div
            className="absolute top-8 left-8 border border-cream/20 bg-charcoal/60 backdrop-blur-md px-4 py-3"
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <p className="font-geist text-[0.55rem] tracking-[0.3em] uppercase text-cream/60">Scottish Hair Awards</p>
            <p className="font-heading italic text-cream text-sm mt-0.5">Barber of the Year</p>
          </motion.div>
        </div>

        {/* Text panel */}
        <div className="relative flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 bg-cream">

          <motion.p
            className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-6"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            The Founder
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h2
              className="font-heading text-charcoal text-4xl md:text-5xl font-normal italic leading-[1.1]"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              Erin Strange
            </motion.h2>
          </div>

          <motion.div
            className="h-px w-10 bg-terracotta/50 mb-8"
            initial={{ width: 0 }} animate={inView ? { width: 40 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          />

          <motion.blockquote
            className="font-heading text-charcoal/85 text-xl md:text-2xl italic font-normal leading-[1.5] mb-8"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            "I didn't want to open another barbershop. I wanted to create a space where
            the experience was as considered as the craft."
          </motion.blockquote>

          <motion.p
            className="font-geist text-charcoal/55 text-sm leading-[1.9] font-light mb-10 max-w-xs"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            Featured on BBC Scotland. Named Scottish Barber of the Year.
            53 five-star reviews. Erin brings over a decade of craft to every single appointment.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-3 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-charcoal/55 hover:text-charcoal transition-colors duration-300 group w-fit"
            >
              Meet the whole team
              <span className="block w-8 h-px bg-current group-hover:w-14 transition-[width] duration-500" />
            </Link>
            <div className="flex items-center gap-4 mt-1">
              <a href="https://www.instagram.com/erinestrange/" target="_blank" rel="noopener noreferrer"
                className="font-geist text-[0.6rem] tracking-[0.25em] uppercase text-charcoal/40 hover:text-charcoal/80 transition-colors duration-300 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                @erinestrange
              </a>
              <a href="https://www.tiktok.com/@erinestrange" target="_blank" rel="noopener noreferrer"
                className="font-geist text-[0.6rem] tracking-[0.25em] uppercase text-charcoal/40 hover:text-charcoal/80 transition-colors duration-300 flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
                </svg>
                TikTok
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
