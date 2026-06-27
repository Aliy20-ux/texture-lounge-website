import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AWARDS = [
  {
    logo: 'BBC',
    quote: '"A salon changing the standard of grooming in Edinburgh — Erin Strange is the name to know."',
    source: 'BBC Scotland',
    year: '2023',
  },
  {
    logo: '★',
    quote: 'Scottish Barber of the Year — recognised for excellence in craft and client experience.',
    source: 'Scottish Hair Awards',
    year: '2023',
  },
  {
    logo: '5★',
    quote: '53 five-star Google reviews. Consistently rated the finest grooming experience in Edinburgh.',
    source: 'Google Reviews',
    year: '2026',
  },
]

export default function Press() {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="bg-charcoal border-y border-cream/6 py-20 md:py-24 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <motion.p
          className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-12 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Recognition
        </motion.p>

        <div ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-10">
          {AWARDS.map((a, i) => (
            <motion.div
              key={a.source}
              className="flex flex-col gap-5 group"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Logo / badge */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-terracotta/30 flex items-center justify-center flex-shrink-0 group-hover:border-terracotta/70 transition-colors duration-500">
                  <span className="font-heading text-terracotta text-sm font-semibold">{a.logo}</span>
                </div>
                <div>
                  <p className="font-geist text-cream/60 text-xs tracking-wider">{a.source}</p>
                  <p className="font-geist text-cream/25 text-[0.6rem] tracking-wider">{a.year}</p>
                </div>
              </div>
              {/* Quote */}
              <p className="font-heading text-cream/75 text-base italic font-normal leading-relaxed">
                {a.quote}
              </p>
              {/* Line */}
              <div className="h-px w-8 bg-terracotta/30 group-hover:w-16 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
