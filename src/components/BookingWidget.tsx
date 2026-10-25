import { useEffect, useRef, useState } from 'react'
import { m, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { TREATWELL_URL } from '../data/business'

const ease = [0.19, 1, 0.22, 1] as const

const EMBED_URL = `${TREATWELL_URL}?utm_source=widget&utm_medium=partners&utm_campaign=website_embed`

export default function BookingWidget() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [loaded, setLoaded] = useState(false)

  // Treatwell's embed pulls ~2.5MB of third-party script. Mount it once the page is idle
  // (hero painted and playing) or as soon as the visitor scrolls near it, whichever is first,
  // so it never competes with the first paint.
  const near = useInView(ref, { once: true })
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setIdle(true), 2500)
    return () => clearTimeout(t)
  }, [])
  const mountIframe = near || idle

  return (
    <section id="booking-widget" className="bg-cream py-24 md:py-32 px-5 md:px-12">
      <div ref={ref} className="max-w-4xl mx-auto">
        <m.p
          className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase text-center mb-5"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
        >
          Browse &amp; Book
        </m.p>

        <div className="overflow-hidden mb-4">
          <m.h2
            className="font-heading text-charcoal text-3xl md:text-4xl font-light italic text-center leading-tight"
            initial={{ y: '110%' }} animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease }}
          >
            Choose a service, pick a time
          </m.h2>
        </div>

        <m.p
          className="font-geist text-charcoal/50 text-xs text-center mb-10"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.12 }}
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
        </m.p>

        <m.div
          className="relative rounded-[2px] border border-charcoal/12 overflow-hidden shadow-[0_24px_60px_-20px_rgba(26,20,19,0.22)] bg-ivory"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.54, delay: 0.17, ease }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-6 h-6 border-2 border-terracotta/25 border-t-terracotta rounded-full animate-spin" />
            </div>
          )}
          {mountIframe ? (
            <iframe
              src={EMBED_URL}
              title="Book an appointment with Texture Lounge"
              className="relative w-full h-[640px] md:h-[760px] border-0"
              allow="payment"
              onLoad={() => setLoaded(true)}
            />
          ) : (
            <div className="w-full h-[640px] md:h-[760px]" />
          )}

          {/* warm wash so the widget sits in the palette instead of reading as a bare embed */}
          <div className="absolute inset-0 pointer-events-none bg-terracotta/[0.045] z-10" />

          {/* live-status chip, matching the map chip on Find Us — top-left so it doesn't collide with Treatwell's own logo */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-cream/90 border border-charcoal/10 px-4 py-2 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
            <span className="font-geist text-charcoal/80 text-[0.55rem] tracking-[0.3em] uppercase">Live Availability</span>
          </div>
        </m.div>
      </div>
    </section>
  )
}
