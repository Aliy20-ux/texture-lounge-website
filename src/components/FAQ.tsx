import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Do you take walk-ins?',
    a: 'No — Texture Lounge is by appointment only. This is intentional. It means your stylist is ready for you, the space is prepared, and your time is protected from the moment you arrive. Book online or call us directly.',
  },
  {
    q: 'How long does a visit take?',
    a: 'A Signature Cut or Beard Architecture takes around 45 minutes. A Hot Towel Shave is 45 minutes. The Lounge Experience — our full package — is 90 minutes. We build in time for the consultation and finish, so you\'re never rushed.',
  },
  {
    q: 'What should I do before my appointment?',
    a: 'Just come as you are. Clean or unstyled hair is slightly easier to assess, but it\'s not a requirement. We\'ll take care of everything else. If you have reference images or ideas, bring them — they help.',
  },
  {
    q: 'Do you have a cancellation policy?',
    a: 'We ask for at least 24 hours\' notice for cancellations or rescheduling. Late cancellations (under 12 hours) may be subject to a 50% charge. We hold your spot exclusively — it matters.',
  },
  {
    q: 'Is Texture Lounge for everyone?',
    a: 'Absolutely. We welcome all hair types, textures, lengths, and clients. Our expertise spans cuts, colour, fades, and grooming for all. If you\'re unsure whether we can help, just get in touch before booking.',
  },
  {
    q: 'Where exactly are you based in Edinburgh?',
    a: 'Our exact address is shared with you on booking confirmation. We\'re centrally located in Edinburgh and easily accessible by foot, bus, or car. Any questions, call or message us directly.',
  },
]

function Item({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border-t border-cream/8 last:border-b last:border-cream/8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className={`font-heading text-lg md:text-xl italic font-normal transition-colors duration-300 ${open ? 'text-cream' : 'text-cream/70 group-hover:text-cream'}`}>
          {faq.q}
        </span>
        <div className={`w-8 h-8 flex-shrink-0 border flex items-center justify-center transition-all duration-400 ${
          open ? 'border-terracotta/60 bg-terracotta/10 rotate-45' : 'border-cream/15 group-hover:border-cream/35'
        }`}>
          <svg className="w-3 h-3 text-cream/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <p className="font-geist text-cream/55 text-sm leading-[1.9] font-light pb-7 max-w-2xl">
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
    <section className="bg-charcoal py-28 md:py-36 px-5 md:px-12 overflow-hidden">
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
              className="font-heading text-cream text-5xl md:text-7xl font-normal italic leading-none"
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
