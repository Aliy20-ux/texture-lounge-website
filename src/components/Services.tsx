import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  { num: '01', name: 'The Signature Cut',     price: '£35', dur: '45 min', desc: 'Precision haircut tailored to your face shape, hair texture and lifestyle. Finished with the right products and styled to leave you completely ready.' },
  { num: '02', name: 'Beard Architecture',    price: '£25', dur: '30 min', desc: 'Sculpting, shaping and defining your beard to complement your features precisely. Clean lines, intentional structure, an immaculate finish.' },
  { num: '03', name: 'Hot Towel Shave',       price: '£40', dur: '45 min', desc: 'The full ritual. Warm towels, premium shaving cream, a straight razor, and the kind of finish that reminds you what a proper shave actually feels like.' },
  { num: '04', name: 'Cut & Beard',           price: '£55', dur: '75 min', desc: 'The Signature Cut paired with Beard Architecture — both services, done back-to-back, at their full standard. No shortcuts taken.' },
  { num: '05', name: 'Fade & Style',          price: '£35', dur: '45 min', desc: 'Low, mid or high fade, blended with studied precision and finished with styling. The clean modern look, executed properly.' },
  { num: '06', name: 'The Lounge Experience', price: '£75', dur: '90 min', desc: 'Our signature package. Signature Cut, Beard Architecture, Hot Towel finishing and a complimentary drink. The full Texture Lounge experience.' },
]

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      className="group border-t border-cream/8 py-7 md:py-8 flex flex-col gap-3 md:gap-4 cursor-default"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-heading text-[3rem] md:text-[4rem] font-light leading-none text-cream/7 group-hover:text-terracotta/20 transition-colors duration-700 select-none tabular-nums">
          {svc.num}
        </span>
        <div className="text-right">
          <span className="font-heading text-xl md:text-2xl text-cream">{svc.price}</span>
          <p className="font-geist text-cream/35 text-[0.6rem] tracking-[0.18em] uppercase mt-0.5">{svc.dur}</p>
        </div>
      </div>
      <h3 className="font-heading text-xl md:text-[1.75rem] text-cream italic font-light leading-tight">{svc.name}</h3>
      <p className="font-geist text-cream/50 text-[0.78rem] leading-relaxed font-light">{svc.desc}</p>
      {/* Hover line */}
      <div className="h-px w-0 bg-terracotta/50 group-hover:w-16 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
    </motion.div>
  )
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <section id="services" className="bg-ink py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <motion.p
              className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={headIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              The Craft
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-heading text-cream text-5xl md:text-7xl font-light italic leading-none"
                initial={{ y: '100%' }}
                animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                Our Services
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="font-geist text-cream/40 text-sm leading-relaxed max-w-xs font-light"
            initial={{ opacity: 0 }}
            animate={headIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            Each service is an exercise in<br className="hidden md:block" />
            precision. No shortcuts, no compromise.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-x-20">
          {SERVICES.map((svc, i) => <ServiceCard key={svc.num} svc={svc} index={i} />)}
        </div>

        {/* Premium packages */}
        <div className="mt-20 pt-16 border-t border-cream/8 grid md:grid-cols-2 gap-5">
          {[
            { name: 'The Full Ritual',       price: '£95',  desc: 'Lounge Experience + Scalp Treatment + Complimentary Whisky.' },
            { name: 'The Monthly Gentleman', price: '£120', desc: 'Monthly membership. Two Signature Cuts, one Beard Architecture.' },
          ].map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group bg-charcoal/60 border border-cream/6 p-8 hover:border-terracotta/25 transition-colors duration-700"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading text-xl text-cream italic font-light">{pkg.name}</h3>
                <span className="font-heading text-xl text-amber">{pkg.price}</span>
              </div>
              <p className="font-geist text-cream/45 text-[0.8rem] leading-relaxed font-light">{pkg.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
