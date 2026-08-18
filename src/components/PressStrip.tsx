import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AWARDS } from './Press'

const ease = [0.19, 1, 0.22, 1] as const

export default function PressStrip() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="bg-cream py-16 md:py-20 px-5 md:px-12 border-y border-charcoal/8 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        {AWARDS.map((a, i) => (
          <motion.div
            key={a.source}
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
          >
            <div className="w-9 h-9 border border-terracotta/30 flex items-center justify-center flex-shrink-0">
              <span className="font-heading text-terracotta text-xs font-semibold">{a.logo}</span>
            </div>
            <div>
              <p className="font-geist text-charcoal/70 text-[0.68rem] tracking-wider">{a.source}</p>
              <p className="font-geist text-charcoal/35 text-[0.55rem] tracking-wider">{a.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
