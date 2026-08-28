import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { STATS } from '../data/business'

function Counter({ n, suffix }: { n: number; suffix: string }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(n / 40)
    const id = setInterval(() => {
      start += step
      if (start >= n) { setCount(n); clearInterval(id) }
      else setCount(start)
    }, 28)
    return () => clearInterval(id)
  }, [inView, n])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const imgRef  = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imgIn   = useInView(imgRef,  { once: true, margin: '-10% 0px' })
  const textIn  = useInView(textRef, { once: true, margin: '-10% 0px' })

  return (
    <section id="philosophy" className="bg-ivory py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Image — clip-path reveal */}
        <div ref={imgRef} className="relative aspect-[3/2] md:aspect-[4/5] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={imgIn ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src="/assets/interior-lounge.jpg"
              alt="Texture Lounge interior"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="absolute bottom-6 right-6 bg-cream/92 backdrop-blur-md border border-charcoal/10 px-5 py-4 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={imgIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="font-heading text-2xl text-charcoal italic font-light">Est.</p>
            <p className="font-heading text-4xl text-terracotta font-light leading-none">2026</p>
          </motion.div>
        </div>

        {/* Text */}
        <div ref={textRef} className="flex flex-col gap-10">

          {/* Tag */}
          <motion.p
            className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            The Philosophy
          </motion.p>

          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-heading text-charcoal text-3xl md:text-4xl lg:text-[2.6rem] font-light italic leading-[1.15]"
              initial={{ y: '100%' }}
              animate={textIn ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Our Story
            </motion.h2>
          </div>

          {/* Body */}
          <motion.p
            className="font-geist text-charcoal/60 text-[0.85rem] leading-[1.9] font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            Your Hair. Your Texture. Your Space.
          </motion.p>

          {/* Animated stats */}
          <motion.div
            className="grid grid-cols-2 gap-6 pt-2"
            initial={{ opacity: 0 }}
            animate={textIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {STATS.map(s => {
              const content = (
                <>
                  <p className="font-heading text-3xl md:text-4xl text-charcoal font-light italic tabular-nums">
                    <Counter n={s.n} suffix={s.suffix} />
                  </p>
                  <p className="font-geist text-charcoal/45 text-[0.65rem] tracking-[0.18em] uppercase mt-1">{s.label}</p>
                </>
              )
              return s.href ? (
                <Link key={s.label} to={s.href} className="border-l border-terracotta/30 pl-4 hover:border-terracotta transition-colors duration-300 group">
                  <span className="group-hover:opacity-70 transition-opacity duration-300 block">{content}</span>
                </Link>
              ) : (
                <div key={s.label} className="border-l border-terracotta/30 pl-4">
                  {content}
                </div>
              )
            })}
          </motion.div>

          {/* CTA link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={textIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-4 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-charcoal/55 hover:text-charcoal transition-colors duration-400 group w-fit"
            >
              Meet the team
              <span className="block w-8 h-px bg-current transition-[width] duration-500 group-hover:w-16" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
