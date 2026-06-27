import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { n: 14, suffix: '+', label: 'Years combined craft' },
  { n: 3,  suffix: '',  label: 'Master barbers'       },
  { n: 6,  suffix: '',  label: 'Signature services'   },
  { n: 53, suffix: '',  label: '5★ reviews'           },
]

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
    <section id="space" className="bg-charcoal py-28 md:py-36 px-5 md:px-12 overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            className="absolute bottom-6 right-6 bg-ink/85 backdrop-blur-md border border-cream/10 px-5 py-4 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={imgIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <p className="font-heading text-2xl text-cream italic font-light">Est.</p>
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

          {/* Quote — word-mask */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-heading text-cream text-3xl md:text-4xl lg:text-[2.6rem] font-light italic leading-[1.15]"
              initial={{ y: '100%' }}
              animate={textIn ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              "Great styling understands that you're not just changing hair —
              <span className="text-terracotta"> you're refining presence."</span>
            </motion.h2>
          </div>

          {/* Body */}
          <motion.p
            className="font-geist text-cream/55 text-[0.85rem] leading-[1.9] font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            We built Texture Lounge around that conviction. Every detail — the terracotta
            on the walls, the weight of the chairs, the unhurried pace of your appointment
            — is an expression of how seriously we take the craft. This is not a
            walk-in salon. This is a considered experience.
          </motion.p>

          {/* Animated stats */}
          <motion.div
            className="grid grid-cols-2 gap-6 pt-2"
            initial={{ opacity: 0 }}
            animate={textIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {STATS.map(s => (
              <div key={s.label} className="border-l border-terracotta/30 pl-4">
                <p className="font-heading text-3xl md:text-4xl text-cream font-light italic tabular-nums">
                  <Counter n={s.n} suffix={s.suffix} />
                </p>
                <p className="font-geist text-cream/40 text-[0.65rem] tracking-[0.18em] uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA link */}
          <motion.a
            href="/about.html"
            className="inline-flex items-center gap-4 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 group w-fit"
            initial={{ opacity: 0 }}
            animate={textIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Meet Erin Strange
            <span className="block w-8 h-px bg-current transition-all duration-500 group-hover:w-16" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
