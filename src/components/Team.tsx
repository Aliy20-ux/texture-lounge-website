import { useRef } from 'react'
import { m, useInView, useReducedMotion } from 'framer-motion'
import { TEAM } from '../data/business'

// Desktop (lg+) roster: card 0 is a full-width feature, the rest sit in a staggered four-up
// row. Static class strings so Tailwind's scanner picks them up.
const LG_OFFSET = ['', 'lg:mt-0', 'lg:mt-24', 'lg:mt-10', 'lg:mt-32']
const LG_ASPECT = ['lg:aspect-[5/4]', 'lg:aspect-[3/4]', 'lg:aspect-[4/5]', 'lg:aspect-[3/4]', 'lg:aspect-[4/5]']

export default function Team() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })
  const reduce  = useReducedMotion()

  return (
    <section id="team" className="bg-cream pt-page pb-28 md:pb-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl lg:max-w-7xl mx-auto">
        <div
          ref={headRef}
          className="mb-18 md:mb-24 lg:mb-20 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:border-b lg:border-charcoal/15 lg:pb-8"
        >
          <div>
            <m.p
              className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
              initial={reduce ? false : { opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            >
              The People
            </m.p>
            <div className="overflow-hidden">
              <m.h2
                className="font-heading text-charcoal text-5xl md:text-7xl lg:text-[clamp(6rem,10.5vw,10rem)] font-light italic leading-none lg:leading-[0.9] lg:tracking-[-0.03em] lg:pb-2"
                initial={reduce ? false : { y: '100%' }}
                animate={headIn ? { y: 0 } : {}}
                transition={{ duration: 0.66, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              >
                Our Team
              </m.h2>
            </div>
          </div>
          <m.p
            className="hidden lg:block text-right font-geist text-charcoal/50 text-[0.6rem] tracking-[0.3em] uppercase leading-loose pb-3"
            initial={reduce ? false : { opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="block font-heading italic font-light text-charcoal text-5xl tracking-normal normal-case leading-none mb-3 tabular-nums">
              {String(TEAM.length).padStart(2, '0')}
            </span>
            Barbers · Edinburgh
          </m.p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-y-24 items-start">
          {TEAM.map((member, i) => <TeamCard key={member.name} member={member} index={i} reduce={!!reduce} />)}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index, reduce }: { member: typeof TEAM[0]; index: number; reduce: boolean }) {
  const ref      = useRef<HTMLDivElement>(null)
  const inView   = useInView(ref, { once: true, margin: '-10% 0px' })
  const featured = index === 0
  const words    = member.name.split(' ')

  return (
    <m.div
      ref={ref}
      className={`group ${featured ? 'lg:col-span-12' : 'lg:col-span-3'} ${LG_OFFSET[index] ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className={featured ? 'lg:grid lg:grid-cols-12 lg:gap-14 lg:items-end' : ''}>
        <div className={featured ? 'lg:col-span-7' : ''}>
          <div className="hidden lg:flex items-center gap-4 mb-4 font-geist text-[0.6rem] tracking-[0.3em] text-charcoal/45 tabular-nums">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden className="h-px flex-1 bg-charcoal/15" />
          </div>

          {/* Image with clip-path reveal — falls back to an initial when no photo is on file yet,
              rather than standing in an unrelated stock photo for a real person. */}
          <div className={`overflow-hidden aspect-[3/4] mb-6 lg:mb-8 relative ${LG_ASPECT[index] ?? 'lg:aspect-[3/4]'}`}>
            <m.div
              className="absolute inset-0"
              initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
              animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
              transition={{ duration: 0.66, delay: index * 0.06 + 0.07, ease: [0.76, 0, 0.24, 1] }}
            >
              {member.img ? (
                <>
                  <img
                    src={member.img}
                    alt={member.name}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className={`w-full h-full object-cover ${featured ? '' : 'lg:object-[50%_22%]'} transition-transform duration-700 group-hover:scale-[1.04]`}
                    style={{ filter: 'saturate(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-ivory border border-charcoal/10 flex items-center justify-center">
                  <span className="font-heading text-6xl md:text-7xl text-terracotta/35 italic font-light">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
            </m.div>
          </div>
        </div>

        <div className={featured ? 'lg:col-span-5 lg:pb-8' : ''}>
          <h3
            className={`font-heading text-xl text-charcoal italic font-light ${
              featured
                ? 'lg:text-[clamp(4.5rem,8.2vw,8.5rem)] lg:leading-[0.9] lg:tracking-[-0.03em]'
                : 'lg:text-[1.7rem] lg:leading-tight'
            }`}
          >
            {words.map((w, i) => (
              <span key={i} className={featured ? `lg:block ${i % 2 ? 'lg:pl-[0.9em]' : ''}` : ''}>
                {w}{i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h3>
          <p className={`font-geist text-terracotta text-[0.6rem] tracking-[0.22em] uppercase mt-1.5 ${featured ? 'lg:mt-8' : 'lg:mt-2'}`}>
            {member.role}
          </p>
          {member.note && (
            <p className="font-geist text-charcoal/50 text-xs mt-2 leading-relaxed font-light lg:font-heading lg:italic lg:text-xl lg:text-charcoal/70 lg:leading-snug lg:mt-8 lg:pl-5 lg:border-l lg:border-terracotta">
              {member.note}
            </p>
          )}
          <span
            aria-hidden
            className="hidden lg:block mt-5 h-px w-full bg-terracotta origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
          />
        </div>
      </div>
    </m.div>
  )
}
