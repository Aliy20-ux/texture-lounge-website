import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SERVICES, PACKAGES } from '../data/business'

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      className="group border-t border-charcoal/10 py-7 md:py-8 flex flex-col gap-3 md:gap-4 cursor-default"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-heading text-[3rem] md:text-[4rem] font-light leading-none text-charcoal/10 group-hover:text-terracotta/30 transition-colors duration-700 select-none tabular-nums">
          {svc.num}
        </span>
        <div className="text-right">
          <span className="font-heading text-xl md:text-2xl text-charcoal">{svc.price}</span>
          <p className="font-geist text-charcoal/45 text-[0.6rem] tracking-[0.18em] uppercase mt-0.5">{svc.dur}</p>
        </div>
      </div>
      <h3 className="font-heading text-xl md:text-[1.75rem] text-charcoal italic font-light leading-tight">{svc.name}</h3>
      <p className="font-geist text-charcoal/55 text-[0.78rem] leading-relaxed font-light">{svc.desc}</p>
      {/* Hover line */}
      <div className="h-px w-0 bg-terracotta/50 group-hover:w-16 transition-[width] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
    </motion.div>
  )
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <section id="services" className="bg-cream py-28 md:py-36 px-5 md:px-12 overflow-hidden">
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
                className="font-heading text-charcoal text-5xl md:text-7xl font-light italic leading-none"
                initial={{ y: '100%' }}
                animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                Our Services
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="font-geist text-charcoal/50 text-sm leading-relaxed max-w-xs font-light"
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
        <div className="mt-20 pt-16 border-t border-charcoal/10 grid md:grid-cols-2 gap-5">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group bg-ivory border border-charcoal/8 p-8 hover:border-terracotta/30 transition-colors duration-700"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading text-xl text-charcoal italic font-light">{pkg.name}</h3>
                <span className="font-heading text-xl text-amber">{pkg.price}</span>
              </div>
              <p className="font-geist text-charcoal/55 text-[0.8rem] leading-relaxed font-light">{pkg.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
