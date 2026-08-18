import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    label: 'Arrive',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M3 12h18M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Consult',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Treatment',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M6 3L3 6l7 7-4 4 2 2 4-4 7 7 3-3-7-7 4-4-2-2-4 4z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Finish',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Experience() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="bg-ivory py-16 md:py-20 px-5 md:px-12 border-y border-charcoal/8 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-8 text-center md:text-left">
          What to Expect
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="flex items-center gap-3 md:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-terracotta/30 flex items-center justify-center text-terracotta">
                {step.icon}
              </div>
              <div>
                <span className="font-geist text-charcoal/30 text-[0.6rem] tabular-nums mr-2">{step.num}</span>
                <span className="font-heading text-charcoal text-base italic font-normal">{step.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
