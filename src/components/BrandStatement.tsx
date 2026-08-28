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

const ease = [0.19, 1, 0.22, 1] as const

export default function BrandStatement() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="bg-cream py-24 md:py-32 px-5 md:px-12 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <div className="overflow-hidden">
          <motion.h2
            className="font-heading text-charcoal text-3xl md:text-5xl font-light italic leading-[1.25]"
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Your Hair. Your Texture. Your Space.
            <span className="text-terracotta"> Welcome to Texture Lounge.</span>
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-14 md:mt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          {STATS.map(s => {
            const content = (
              <>
                <p className="font-heading text-3xl md:text-4xl text-charcoal font-light italic tabular-nums">
                  <Counter n={s.n} suffix={s.suffix} />
                </p>
                <p className="font-geist text-charcoal/50 text-[0.62rem] tracking-[0.16em] uppercase mt-1">{s.label}</p>
              </>
            )
            return s.href ? (
              <Link key={s.label} to={s.href} className="border-t border-terracotta/30 pt-4 hover:border-terracotta transition-colors duration-300 group">
                <span className="group-hover:opacity-70 transition-opacity duration-300 block">{content}</span>
              </Link>
            ) : (
              <div key={s.label} className="border-t border-terracotta/30 pt-4">
                {content}
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
