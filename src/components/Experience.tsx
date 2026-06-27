import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    label: 'Arrive',
    desc: 'Step into the lounge. A drink is offered — whisky, espresso, or water — before your appointment begins. No rush. No waiting room energy.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M3 12h18M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Consult',
    desc: 'Your stylist takes time — not a token thirty seconds — to understand your hair, your lifestyle, and what you actually want from this appointment.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Treatment',
    desc: 'The service, delivered at its full standard. Precision. Patience. Proper technique. The kind of attention that turns a haircut into something you notice for weeks.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M6 3L3 6l7 7-4 4 2 2 4-4 7 7 3-3-7-7 4-4-2-2-4 4z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Finish',
    desc: 'Styled and ready. Every appointment ends with the right products applied the right way. You leave looking exactly as you should — and you\'ll know the difference.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Experience() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <section className="bg-ink py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <motion.p
              className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}
            >
              What to Expect
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-heading text-cream text-5xl md:text-7xl font-normal italic leading-none"
                initial={{ y: '100%' }} animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                The Experience
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="font-geist text-cream/40 text-sm font-light max-w-xs leading-relaxed"
            initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every appointment follows the same unhurried rhythm. Here's what happens when you walk through the door.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-cream/8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="group border-b border-cream/8 md:border-b-0 md:border-r last:border-r-0 odd:border-r border-cream/8 py-8 md:py-12 px-4 md:px-8 first:pl-0 last:pr-0 flex flex-col gap-4 md:gap-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Number + icon */}
              <div className="flex items-start justify-between">
                <span className="font-heading text-[3rem] leading-none text-cream/6 group-hover:text-terracotta/20 transition-colors duration-700 tabular-nums font-light">
                  {step.num}
                </span>
                <div className="text-cream/30 group-hover:text-terracotta/60 transition-colors duration-500 mt-1">
                  {step.icon}
                </div>
              </div>

              {/* Label */}
              <div className="overflow-hidden">
                <motion.h3
                  className="font-heading text-cream text-2xl italic font-normal"
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1 + 0.15, ease: [0.76, 0, 0.24, 1] }}
                >
                  {step.label}
                </motion.h3>
              </div>

              {/* Description */}
              <p className="font-geist text-cream/45 text-[0.8rem] leading-[1.85] font-light">
                {step.desc}
              </p>

              {/* Grow line on hover */}
              <div className="h-px w-0 bg-terracotta/40 group-hover:w-10 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] mt-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
