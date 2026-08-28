import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { REVIEWS } from '../data/business'

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

export default function TestimonialStrip() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const picks  = REVIEWS.slice(0, 3)

  return (
    <section className="bg-ivory py-24 md:py-32 px-5 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <Link to="/reviews" className="block group">
          <div className="flex items-center justify-between gap-6 mb-12">
            <p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase">What They Say</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-amber" viewBox="0 0 20 20">
                      <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                    </svg>
                  ))}
                </div>
                <span className="font-geist text-charcoal/45 text-xs tracking-wider">5.0</span>
              </div>
              <span className="hidden md:flex items-center gap-1.5 font-geist text-charcoal/45 text-[0.6rem] tracking-[0.16em] uppercase group-hover:text-terracotta transition-colors duration-300">
                View all <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {picks.map((r, i) => (
              <motion.div
                key={r.name}
                className="bg-cream border border-charcoal/8 p-6 md:p-7 flex flex-col gap-4 group-hover:border-terracotta/30 transition-colors duration-500"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
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
        </Link>
      </div>
    </section>
  )
}
