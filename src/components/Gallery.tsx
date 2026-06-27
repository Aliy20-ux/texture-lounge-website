import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PHOTOS = [
  { src: '/assets/interior-lounge.jpg', label: 'The Lounge',   ratio: 'aspect-[3/4]', delay: 0    },
  { src: '/assets/erin-strange.jpg',    label: 'The Artist',   ratio: 'aspect-[4/5]', delay: 0.12 },
  { src: '/assets/interior-barber.jpg', label: 'The Craft',    ratio: 'aspect-[3/4]', delay: 0.24 },
  { src: '/assets/interior-lounge.jpg', label: 'The Ritual',   ratio: 'aspect-[4/5]', delay: 0.34 },
]

export default function Gallery() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <section className="bg-ink py-28 md:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              Inside Texture Lounge
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2 className="font-heading text-cream text-5xl md:text-7xl font-normal italic leading-none"
                initial={{ y: '100%' }} animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}>
                The Space
              </motion.h2>
            </div>
          </div>
          <motion.a href="/about.html"
            className="font-geist text-[0.6rem] tracking-[0.3em] uppercase text-cream/40 hover:text-cream transition-colors duration-300 flex items-center gap-3 group w-fit"
            initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            Meet the team
            <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
          </motion.a>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-end">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden group ${p.ratio} ${i === 1 || i === 3 ? 'md:mt-12' : ''}`}
              initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.2, delay: p.delay, ease: [0.76, 0, 0.24, 1] }}
            >
              <img
                src={p.src}
                alt={p.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                style={{ filter: 'saturate(0.85) brightness(0.95)' }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500 flex items-end p-4">
                <motion.span
                  className="font-heading italic text-cream text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 translate-y-2 group-hover:translate-y-0"
                  style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
                >
                  {p.label}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social CTAs */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="h-px flex-1 bg-cream/8" />
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/erinestrange/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-cream/40 hover:text-cream transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
            <div className="w-px h-3 bg-cream/15" />
            <a
              href="https://www.tiktok.com/@erinestrange"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-cream/40 hover:text-cream transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
              </svg>
              TikTok
            </a>
          </div>
          <div className="h-px flex-1 bg-cream/8" />
        </motion.div>
      </div>
    </section>
  )
}
