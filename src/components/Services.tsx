import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SERVICE_CATEGORIES } from '../data/business'

function ServiceRow({ svc, num, index }: { svc: { name: string; price: string; dur: string }; num: number; index: number }) {
  const ref  = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 6) * 0.06, ease: [0.19, 1, 0.22, 1] }}
      className="group border-t border-charcoal/10 py-6 flex items-start justify-between gap-6"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-heading text-lg text-charcoal/20 group-hover:text-terracotta/40 transition-colors duration-500 tabular-nums">
          {String(num).padStart(2, '0')}
        </span>
        <h3 className="font-heading text-lg md:text-xl text-charcoal italic font-light leading-tight">{svc.name}</h3>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="font-heading text-base md:text-lg text-charcoal">{svc.price}</span>
        <p className="font-geist text-charcoal/45 text-[0.58rem] tracking-[0.16em] uppercase mt-0.5">{svc.dur}</p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })
  let runningIndex = 0

  return (
    <section id="services" className="bg-cream py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
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
            Real prices, live availability —<br className="hidden md:block" />
            book any of these below.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-14">
          {SERVICE_CATEGORIES.map(cat => (
            <div key={cat.name}>
              <p className="font-geist text-terracotta text-[0.62rem] tracking-[0.3em] uppercase mb-1">{cat.name}</p>
              <div>
                {cat.services.map(svc => {
                  runningIndex += 1
                  return <ServiceRow key={svc.name} svc={svc} num={runningIndex} index={runningIndex - 1} />
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
