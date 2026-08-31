import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { REVIEWS, BRAND, GOOGLE_REVIEW_URL } from '../data/business'
import Booking from '../components/Booking'
import { useSEO } from '../lib/seo'

const ease = [0.19, 1, 0.22, 1] as const

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-amber" viewBox="0 0 20 20">
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  useSEO(
    `Reviews | ${BRAND.name} Edinburgh`,
    `Real client reviews for ${BRAND.name} — Edinburgh's premium curly hair salon and barbershop.`,
    '/reviews'
  )

  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <div>
      <section className="bg-cream py-28 md:py-36 px-5 md:px-12 overflow-hidden">
        <h1 className="sr-only">Reviews — Texture Lounge Edinburgh</h1>
        <div className="max-w-6xl mx-auto">
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.p
              className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={headIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              What They Say
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-heading text-charcoal text-5xl md:text-7xl font-light italic leading-none"
                initial={{ y: '100%' }}
                animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                Reviews
              </motion.h2>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={headIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-amber" viewBox="0 0 20 20">
                  <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                </svg>
              ))}
            </div>
            <span className="font-geist text-charcoal/45 text-sm tracking-wider">5.0</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              className="bg-ivory border border-charcoal/8 p-6 md:p-7 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease }}
            >
              <Stars />
              <p className="font-heading text-charcoal/85 text-base italic font-normal leading-relaxed flex-1">
                "{r.text}"
              </p>
              <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between">
                <span className="font-geist text-charcoal/55 text-xs tracking-wider">{r.name}</span>
                <span className="font-geist text-terracotta/70 text-[0.58rem] tracking-[0.16em] uppercase">{r.service}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 md:mt-20 bg-charcoal px-8 md:px-14 py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: 0.9, ease }}
        >
          <div>
            <p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4">Been in to see Erin?</p>
            <h3 className="font-heading text-cream text-3xl md:text-4xl font-light italic leading-tight mb-3">
              Tell us how it went
            </h3>
            <p className="font-geist text-cream/50 text-sm leading-relaxed max-w-sm">
              A minute of yours helps the next person find their way to the chair — and it means a lot to Erin directly.
            </p>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-cream border border-cream/25 hover:border-cream/60 hover:bg-cream/5 transition-colors duration-300 px-7 py-4 w-fit shrink-0"
          >
            Leave a Google review
            <span className="block w-6 h-px bg-current" />
          </a>
        </motion.div>
        </div>
      </section>
      <Booking />
    </div>
  )
}
