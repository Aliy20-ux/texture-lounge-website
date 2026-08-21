import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bus, TramFront, TrainFront } from 'lucide-react'
import { ADDRESS, HOURS_GROUPED, TRANSPORT, MAPS_EMBED_SRC, MAPS_LINK, PHONE } from '../data/business'

const TRANSPORT_ICONS = { 'By Bus': Bus, 'By Tram': TramFront, 'By Train': TrainFront } as const

const ease = [0.19, 1, 0.22, 1] as const

export default function Location() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="location" className="bg-cream py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-14 lg:gap-20 items-stretch">

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
              className="font-heading text-charcoal text-4xl md:text-5xl lg:text-[3.4rem] font-light leading-[1.02] tracking-[-0.02em]"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              {ADDRESS.line}
              <span className="block italic text-sage">{ADDRESS.city}</span>
            </motion.h2>
          </div>

          <motion.p
            className="font-geist text-charcoal/55 text-sm tracking-[0.18em] uppercase mt-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            {ADDRESS.postcode}
          </motion.p>

          <motion.a
            href={`tel:${PHONE.tel}`}
            className="font-geist text-charcoal/70 hover:text-charcoal text-sm tracking-[0.1em] mt-3 w-fit transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.32, ease }}
          >
            {PHONE.display}
          </motion.a>

          {/* divider */}
          <motion.div
            className="h-px bg-charcoal/12 my-9 origin-left"
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
              {HOURS_GROUPED.map(h => (
                <li key={h.day} className="flex items-baseline justify-between gap-6 border-b border-charcoal/[0.08] pb-3">
                  <span className="font-geist text-charcoal/60 text-sm tracking-wide">{h.day}</span>
                  <span className="font-geist text-charcoal/90 text-sm tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* walk-ins note */}
          <motion.div
            className="flex items-start gap-3 mt-7 max-w-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage mt-[0.42rem] shrink-0" />
            <p className="font-geist text-charcoal/55 text-[0.82rem] leading-[1.7] font-light">
              <span className="text-charcoal/85">Walk-ins are welcome.</span> To guarantee your time with the barber of your choice, we recommend booking ahead.
            </p>
          </motion.div>

          {/* open in maps */}
          <motion.a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-charcoal/55 hover:text-charcoal transition-colors duration-300 w-fit mt-auto pt-10"
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
          className="relative rounded-[2px] overflow-hidden border border-charcoal/12 min-h-[360px] lg:min-h-[520px] bg-ivory"
          initial={{ opacity: 0, clipPath: 'inset(0 0 12% 0)' }}
          animate={inView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <iframe
            title="Map to Texture Lounge, 12 Melville Place, Edinburgh"
            src={MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, filter: 'saturate(0.8) contrast(0.96)' }}
          />

          {/* warm wash so the map sits in the palette */}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-terracotta/[0.06]" />

          {/* brand chip */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-cream/90 backdrop-blur-md border border-charcoal/10 px-4 py-2 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="font-geist text-charcoal/80 text-[0.55rem] tracking-[0.3em] uppercase">Texture Lounge</span>
          </div>

          {/* address caption chip */}
          <div className="absolute bottom-4 left-4 z-10 bg-cream/90 backdrop-blur-md border border-charcoal/10 px-4 py-3 pointer-events-none">
            <p className="font-geist text-charcoal/90 text-xs tracking-wide">{ADDRESS.line}</p>
            <p className="font-geist text-charcoal/55 text-[0.62rem] tracking-wide mt-0.5">{ADDRESS.city} · {ADDRESS.postcode}</p>
          </div>
        </motion.div>
      </div>

      {/* ── GETTING HERE — transport ── */}
      <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5">
        {TRANSPORT.map((t, i) => {
          const Icon = TRANSPORT_ICONS[t.label as keyof typeof TRANSPORT_ICONS]
          return (
            <motion.div
              key={t.label}
              className="border border-charcoal/10 bg-ivory p-5 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.1, ease }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-4 h-4 text-terracotta" strokeWidth={1.5} />
                <span className="font-geist text-charcoal/75 text-[0.58rem] tracking-[0.28em] uppercase">{t.label}</span>
              </div>
              <p className="font-geist text-charcoal/55 text-[0.8rem] leading-[1.7] font-light">{t.body}</p>
            </motion.div>
          )
        })}
      </div>
      </div>
    </section>
  )
}
