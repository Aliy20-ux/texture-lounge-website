import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Real salon details ──
const ADDRESS_LINE = '12 Melville Place'
const CITY         = 'Edinburgh'
const POSTCODE     = 'EH3 7PR'
const MAPS_QUERY   = '12 Melville Place, Edinburgh EH3 7PR'

const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`

const HOURS = [
  { day: 'Mon — Wed', time: '9am – 7pm' },
  { day: 'Thu — Fri', time: '9am – 8pm' },
  { day: 'Saturday',  time: '9am – 7pm' },
  { day: 'Sunday',    time: '10am – 5pm' },
]

const ease = [0.19, 1, 0.22, 1] as const

export default function Location() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="location" className="bg-ink py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-14 lg:gap-20 items-stretch">

        {/* ── LEFT — address + hours ── */}
        <div className="flex flex-col">

          <motion.p
            className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            Find Us
          </motion.p>

          <div className="overflow-hidden mt-5">
            <motion.h2
              className="font-heading text-cream text-4xl md:text-5xl lg:text-[3.4rem] font-light leading-[1.02] tracking-[-0.02em]"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              {ADDRESS_LINE}
              <span className="block italic text-sage">{CITY}</span>
            </motion.h2>
          </div>

          <motion.p
            className="font-geist text-cream/45 text-sm tracking-[0.18em] uppercase mt-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            {POSTCODE}
          </motion.p>

          {/* divider */}
          <motion.div
            className="h-px bg-cream/10 my-9 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* hours */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <p className="font-geist text-terracotta text-[0.6rem] tracking-[0.35em] uppercase mb-5">Hours</p>
            <ul className="flex flex-col gap-3 list-none">
              {HOURS.map(h => (
                <li key={h.day} className="flex items-baseline justify-between gap-6 border-b border-cream/[0.06] pb-3">
                  <span className="font-geist text-cream/55 text-sm tracking-wide">{h.day}</span>
                  <span className="font-geist text-cream/85 text-sm tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* by-appointment note */}
          <motion.div
            className="flex items-center gap-3 mt-7"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span className="font-geist text-cream/40 text-[0.62rem] tracking-[0.28em] uppercase">By appointment · Book online</span>
          </motion.div>

          {/* open in maps */}
          <motion.a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-cream/50 hover:text-cream transition-colors duration-300 w-fit mt-auto pt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.65, ease }}
          >
            Open in Google Maps
            <span className="block w-8 h-px bg-current transition-[width] duration-500 group-hover:w-16" />
          </motion.a>
        </div>

        {/* ── RIGHT — map ── */}
        <motion.div
          className="relative rounded-[2px] overflow-hidden border border-cream/10 min-h-[360px] lg:min-h-[520px] bg-charcoal"
          initial={{ opacity: 0, clipPath: 'inset(0 0 12% 0)' }}
          animate={inView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <iframe
            title="Map to Texture Lounge, 12 Melville Place, Edinburgh"
            src={EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) brightness(0.9) contrast(0.92) saturate(0.7)' }}
          />

          {/* warm wash so the map sits in the palette */}
          <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-terracotta/10" />

          {/* brand chip */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-ink/80 backdrop-blur-md border border-cream/10 px-4 py-2 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="font-geist text-cream/80 text-[0.55rem] tracking-[0.3em] uppercase">Texture Lounge</span>
          </div>

          {/* address caption chip */}
          <div className="absolute bottom-4 left-4 z-10 bg-ink/80 backdrop-blur-md border border-cream/10 px-4 py-3 pointer-events-none">
            <p className="font-geist text-cream/90 text-xs tracking-wide">{ADDRESS_LINE}</p>
            <p className="font-geist text-cream/45 text-[0.62rem] tracking-wide mt-0.5">{CITY} · {POSTCODE}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
