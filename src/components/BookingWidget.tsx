import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { TREATWELL_URL } from '../data/business'

const ease = [0.19, 1, 0.22, 1] as const

const EMBED_URL = `${TREATWELL_URL}?utm_source=widget&utm_medium=partners&utm_campaign=website_embed`

export default function BookingWidget() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [loaded, setLoaded] = useState(false)

  return (
    <section id="booking-widget" className="bg-cream py-24 md:py-32 px-5 md:px-12">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.p
          className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase text-center mb-5"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}
        >
          Browse &amp; Book
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h2
            className="font-heading text-charcoal text-3xl md:text-4xl font-light italic text-center leading-tight"
            initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            Choose a service, pick a time
          </motion.h2>
        </div>

        <motion.p
          className="font-geist text-charcoal/50 text-xs text-center mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.25 }}
        >
          Live availability, powered by Treatwell —{' '}
          <a
            href={EMBED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-terracotta hover:underline"
          >
            open in a new tab <ExternalLink className="w-3 h-3" />
          </a>
        </motion.p>

        <motion.div
          className="relative rounded-[2px] border border-charcoal/12 overflow-hidden shadow-[0_24px_60px_-20px_rgba(26,20,19,0.22)] bg-ivory"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-6 h-6 border-2 border-terracotta/25 border-t-terracotta rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={EMBED_URL}
            title="Book an appointment with Texture Lounge"
            className="relative w-full h-[640px] md:h-[760px] border-0"
            allow="payment"
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />

          {/* warm wash so the widget sits in the palette instead of reading as a bare embed */}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-terracotta/[0.045] z-10" />

          {/* live-status chip, matching the map chip on Find Us — top-left so it doesn't collide with Treatwell's own logo */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-cream/90 backdrop-blur-md border border-charcoal/10 px-4 py-2 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            <span className="font-geist text-charcoal/80 text-[0.55rem] tracking-[0.3em] uppercase">Live Availability</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
