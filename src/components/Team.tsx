import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TEAM = [
  { name: 'Erin Strange', role: 'Founder & Master Barber', note: 'Scottish Barber of the Year · BBC Scotland', img: '/assets/erin-strange.jpg' },
  { name: 'James Okafor', role: 'Senior Barber',           note: '9 years · precision & fade specialist',     img: '/assets/interior-barber.jpg' },
  { name: 'Marcus Webb',  role: 'Lead Stylist',            note: 'Beard architecture & wet shave expert',     img: '/assets/interior-lounge.jpg' },
]

export default function Team() {
  const headRef = useRef<HTMLDivElement>(null)
  const headIn  = useInView(headRef, { once: true, margin: '-15% 0px' })

  return (
    <section id="team" className="bg-ink py-28 md:py-36 px-5 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={headRef} className="mb-18 md:mb-24">
          <motion.p
            className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4"
            initial={{ opacity: 0 }} animate={headIn ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}
          >
            The People
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-heading text-cream text-5xl md:text-7xl font-light italic leading-none"
              initial={{ y: '100%' }}
              animate={headIn ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Our Team
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TEAM.map((member, i) => <TeamCard key={member.name} member={member} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: index * 0.12, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Image with clip-path reveal */}
      <div className="overflow-hidden aspect-[3/4] mb-6 relative">
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ duration: 1.1, delay: index * 0.12 + 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ filter: 'saturate(0.9)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
        </motion.div>
      </div>
      <p className="font-heading text-xl text-cream italic font-light">{member.name}</p>
      <p className="font-geist text-terracotta text-[0.6rem] tracking-[0.22em] uppercase mt-1.5">{member.role}</p>
      <p className="font-geist text-cream/35 text-xs mt-2 leading-relaxed font-light">{member.note}</p>
    </motion.div>
  )
}
