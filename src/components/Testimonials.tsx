import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  { name: 'Marcus T.',     score: 5, text: "I've been to salons across Edinburgh and nothing comes close. Erin has an instinct for what actually suits your face — she didn't just cut my hair, she changed the way I carry myself.", service: 'Signature Cut' },
  { name: 'Callum R.',     score: 5, text: "The hot towel shave is a full ritual. I came in stressed and left feeling completely reset. The space itself does something to you — it's genuinely unlike anywhere else.", service: 'Hot Towel Shave' },
  { name: 'David S.',      score: 5, text: "I was sceptical about spending this much on a haircut. After the first visit I understood immediately. This is not a haircut. It's an hour of being looked after properly.", service: 'The Lounge Experience' },
  { name: 'Rory M.',       score: 5, text: "Erin has been cutting my hair for six months now. She remembers exactly what I want, suggests subtle changes that always turn out to be exactly right. Outstanding.", service: 'Cut & Beard' },
  { name: 'James A.',      score: 5, text: "Came in for a beard shape up and left with the best version of myself I've looked in years. The environment alone makes it worth it — dark, warm, completely calm.", service: 'Beard Architecture' },
  { name: 'Finlay H.',     score: 5, text: "Booked for a birthday treat and it became my monthly routine. The level of attention to detail in everything — the consultation, the cut, the finish — is something I hadn't experienced before.", service: 'Fade & Style' },
]

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

export default function Testimonials() {
  const headRef  = useRef<HTMLDivElement>(null)
  const headIn   = useInView(headRef, { once: true, margin: '-15% 0px' })
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0))
    setScrollLeft(trackRef.current?.scrollLeft || 0)
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - (trackRef.current.offsetLeft || 0)
    trackRef.current.scrollLeft = scrollLeft - (x - startX)
  }
  const onMouseUp = () => setIsDragging(false)

  return (
    <section className="bg-charcoal py-28 md:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
              initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
              What They Say
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2 className="font-heading text-cream text-5xl md:text-7xl font-normal italic leading-none"
                initial={{ y: '100%' }} animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}>
                53 five-star visits
              </motion.h2>
            </div>
          </div>
          <motion.div className="flex items-center gap-3"
            initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-amber" viewBox="0 0 20 20">
                  <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                </svg>
              ))}
            </div>
            <span className="font-geist text-cream/40 text-xs tracking-wider">5.0 · Google Reviews</span>
          </motion.div>
        </div>
      </div>

      {/* Drag-scroll review strip */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-2 px-5 md:px-12 select-none"
        style={{ scrollbarWidth: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {REVIEWS.map((r, i) => (
          <motion.div
            key={r.name}
            className="flex-shrink-0 w-[82vw] sm:w-[300px] md:w-[340px] bg-ink/60 border border-cream/6 p-6 md:p-8 flex flex-col gap-4 hover:border-cream/15 transition-colors duration-500"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
          >
            <Stars />
            <p className="font-heading text-cream/85 text-lg italic font-normal leading-relaxed flex-1">
              "{r.text}"
            </p>
            <div className="pt-4 border-t border-cream/8 flex items-center justify-between">
              <span className="font-geist text-cream/50 text-xs tracking-wider">{r.name}</span>
              <span className="font-geist text-terracotta/60 text-[0.6rem] tracking-[0.18em] uppercase">{r.service}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
