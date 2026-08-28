import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { REVIEWS, BRAND } from '../data/business'
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
    <div className="bg-cream py-28 md:py-36 px-5 md:px-12 overflow-hidden">
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
      </div>
      <Booking />
    </div>
  )
}
