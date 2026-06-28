import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const LINKS = [
  { label: 'Story',     href: '/about.html' },
  { label: 'Services',  href: '#services'  },
  { label: 'The Space', href: '#space'     },
  { label: 'Barbers',   href: '#team'      },
]

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.35
    const y = (e.clientY - r.top  - r.height / 2) * 0.35
    el.style.transform = `translate(${x}px,${y}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <a
      ref={ref}
      href="#booking"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="hidden md:flex group items-center gap-2 bg-sage rounded-full pl-5 pr-1.5 py-1.5 hover:bg-cream transition-all duration-500 shadow-lg"
      style={{ transition: 'background 0.3s ease, box-shadow 0.3s ease' }}
    >
      <span className="text-charcoal text-xs md:text-sm font-geist font-medium tracking-[0.12em] uppercase">
        Book Now
      </span>
      <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors duration-300">
        <ArrowRight className="w-3.5 h-3.5 text-charcoal group-hover:translate-x-0.5 transition-transform duration-300" />
      </span>
    </a>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-4 md:py-5 flex items-center justify-between transition-all duration-700 ${
        scrolled ? 'bg-ink/88 backdrop-blur-xl shadow-[0_1px_0_rgba(237,224,204,0.06)]' : ''
      }`}>
        <a href="/" className="relative z-50 flex-shrink-0 leading-none text-sage">
          <span className="font-heading italic text-2xl md:text-3xl block">texture</span>
          <span className="font-geist text-[0.45rem] md:text-[0.55rem] tracking-[0.5em] pl-[0.5em] block uppercase">Lounge</span>
        </a>

        {/* Desktop links with animated underline */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {LINKS.map(l => (
            <li key={l.href} className="relative group">
              <a
                href={l.href}
                className="font-geist font-light text-sm tracking-wide text-cream/70 hover:text-cream transition-colors duration-300"
              >
                {l.label}
              </a>
              <span className="absolute bottom-[-3px] left-0 h-px w-0 bg-terracotta group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </li>
          ))}
        </ul>

        <MagneticCTA />

        {/* Hamburger */}
        <button
          className="relative z-50 md:hidden flex flex-col items-center justify-center w-10 h-10 gap-0"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`block w-5 h-[1.5px] bg-cream rounded-full transition-all duration-400 ease-[cubic-bezier(0.77,0,0.18,1)] ${
            menuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-[3px]'
          }`} />
          <span className={`block w-5 h-[1.5px] bg-cream rounded-full transition-all duration-400 ease-[cubic-bezier(0.77,0,0.18,1)] ${
            menuOpen ? '-rotate-45' : 'translate-y-[3px]'
          }`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-600 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        <div className={`absolute inset-0 bg-ink/97 backdrop-blur-2xl transition-opacity duration-600 ${
          menuOpen ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          {/* Location pill */}
          <div style={{
            transition: `opacity 0.5s ease ${menuOpen ? 60 : 0}ms`,
            opacity: menuOpen ? 1 : 0,
          }} className="mb-10">
            <p className="font-geist text-[0.55rem] tracking-[0.35em] uppercase text-cream/30 text-center">Edinburgh, Scotland</p>
          </div>

          <ul className="flex flex-col items-center gap-6 list-none w-full">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{
                transition: `opacity 0.6s ease ${menuOpen ? 80 + i * 70 : 0}ms, transform 0.6s cubic-bezier(0.19,1,0.22,1) ${menuOpen ? 80 + i * 70 : 0}ms`,
                opacity:   menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(28px)',
              }}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-[2.2rem] font-light italic text-cream/90 tracking-wide hover:text-terracotta transition-colors duration-300 block text-center"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Reserve CTA */}
          <div className="mt-10" style={{
            transition: `opacity 0.6s ease ${menuOpen ? 400 : 0}ms, transform 0.6s cubic-bezier(0.19,1,0.22,1) ${menuOpen ? 400 : 0}ms`,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
          }}>
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 bg-sage text-charcoal font-geist text-xs font-semibold tracking-[0.22em] uppercase px-10 py-4 rounded-full shadow-[0_6px_28px_rgba(123,174,142,0.35)]"
            >
              Reserve Now
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Social + hours */}
          <div className="mt-10 flex flex-col items-center gap-4" style={{
            transition: `opacity 0.5s ease ${menuOpen ? 520 : 0}ms`,
            opacity: menuOpen ? 1 : 0,
          }}>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/erinestrange/" target="_blank" rel="noopener noreferrer"
                className="font-geist text-[0.55rem] tracking-[0.3em] uppercase text-cream/35 hover:text-cream/70 transition-colors duration-300">
                Instagram
              </a>
              <span className="w-px h-3 bg-cream/15" />
              <a href="https://www.tiktok.com/@erinestrange" target="_blank" rel="noopener noreferrer"
                className="font-geist text-[0.55rem] tracking-[0.3em] uppercase text-cream/35 hover:text-cream/70 transition-colors duration-300">
                TikTok
              </a>
            </div>
            <p className="font-geist text-cream/20 text-[0.5rem] tracking-[0.15em] text-center leading-loose">
              Mon–Wed 09–19 · Thu–Fri 09–20 · Sat 09–19 · Sun 10–17
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
