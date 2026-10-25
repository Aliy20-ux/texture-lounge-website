import { useRef, useEffect, useState } from 'react'
import { m, useInView } from 'framer-motion'
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
    <section id="philosophy" className="bg-ivory pt-page pb-28 md:pb-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* Image — clip-path reveal */}
        <div ref={imgRef} className="relative aspect-[3/2] md:aspect-[4/5] overflow-hidden">
          <m.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={imgIn ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src="/assets/interior-lounge.jpg"
              alt="Texture Lounge interior"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </m.div>

          {/* Floating badge */}
          <m.div
            className="absolute bottom-6 right-6 bg-cream/92 border border-charcoal/10 px-5 py-4 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={imgIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="font-heading text-2xl text-charcoal italic font-light">Est.</p>
            <p className="font-heading text-4xl text-terracotta font-light leading-none">2026</p>
          </m.div>
        </div>

        {/* Text */}
        <div ref={textRef} className="flex flex-col gap-10">

          {/* Tag */}
          <m.p
            className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            The Philosophy
          </m.p>

          {/* Heading */}
          <div className="overflow-hidden">
            <m.h2
              className="font-heading text-charcoal text-3xl md:text-4xl lg:text-[2.6rem] font-light italic leading-[1.15]"
              initial={{ y: '100%' }}
              animate={textIn ? { y: 0 } : {}}
              transition={{ duration: 0.66, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
            >
              Our Story
            </m.h2>
          </div>

          {/* Founder quote */}
          <m.blockquote
            className="font-heading text-charcoal text-lg md:text-xl italic font-light leading-[1.6] border-l-2 border-terracotta/40 pl-5"
            initial={{ opacity: 0, y: 16 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.54, delay: 0.17, ease: [0.19, 1, 0.22, 1] }}
          >
            "I didn't want to open just another hair salon or barbershop. I wanted to create a
            space where everyone feels catered to, understood and welcome."
          </m.blockquote>

          {/* Body */}
          <m.div
            className="flex flex-col gap-5 font-geist text-charcoal/60 text-[0.85rem] leading-[1.9] font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={textIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.54, delay: 0.23, ease: [0.19, 1, 0.22, 1] }}
          >
            <p>
              Texture Lounge was born from the belief that great hair services should never be
              one-size-fits-all. Whether you have curls, coils, waves, straight hair, or anything
              in between, your hair deserves to be understood and treated with the right
              knowledge and care.
            </p>
            <p>
              After years of working behind the chair, travelling, training and meeting people
              with completely different hair needs, I realised there was something missing — a
              space missing in Edinburgh that brings specialist curly hair stylist, barbering and
              genuine community together under one roof.
            </p>
            <p>So I created Texture Lounge.</p>
            <p>
              A place where you can come for a haircut, a curl transformation, a colour, braids, a
              wash and style — but also somewhere you can relax, connect and feel completely at
              home.
            </p>
            <p>
              Because Texture Lounge isn't just about hair. It's about people, identity,
              confidence and creating a space where everyone has a seat.
            </p>
          </m.div>

          {/* Animated stats */}
          <m.div
            className="grid grid-cols-2 gap-6 pt-2"
            initial={{ opacity: 0 }}
            animate={textIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
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
          </m.div>

          {/* CTA link */}
          <m.div
            initial={{ opacity: 0 }}
            animate={textIn ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-4 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-charcoal/55 hover:text-charcoal transition-colors duration-400 group w-fit"
            >
              Meet the team
              <span className="block w-8 h-px bg-current transition-[width] duration-500 group-hover:w-16" />
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  )
}
