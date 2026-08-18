import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FAQS } from '../data/business'

function Item({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border-t border-charcoal/10 last:border-b last:border-charcoal/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className={`font-heading text-lg md:text-xl italic font-normal transition-colors duration-300 ${open ? 'text-charcoal' : 'text-charcoal/65 group-hover:text-charcoal'}`}>
          {faq.q}
        </span>
        <div className={`w-8 h-8 flex-shrink-0 border flex items-center justify-center transition-[border-color,background-color,transform] duration-400 ${
          open ? 'border-terracotta/60 bg-terracotta/10 rotate-45' : 'border-charcoal/15 group-hover:border-charcoal/35'
        }`}>
          <svg className="w-3 h-3 text-charcoal/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <p className="font-geist text-charcoal/60 text-sm leading-[1.9] font-light pb-7 max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <section className="bg-cream py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <div ref={headRef} className="mb-14">
          <motion.p
            className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
            initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}
          >
            Before You Book
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-heading text-charcoal text-5xl md:text-7xl font-normal italic leading-none"
              initial={{ y: '100%' }} animate={headIn ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Questions
            </motion.h2>
          </div>
        </div>

        <div>
          {FAQS.map((faq, i) => <Item key={faq.q} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  )
}
