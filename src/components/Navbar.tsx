import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Scissors, Menu } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const LINKS = [
  { label: 'Story',     href: '/story'    },
  { label: 'Services',  href: '/services' },
  { label: 'The Space', href: '/space'    },
  { label: 'Barbers',   href: '/team'     },
  { label: 'Find Us',   href: '/find-us'  },
]

function MagneticCTA() {
  const ref = useRef<HTMLButtonElement>(null)
  const { openBooking } = useBooking()

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.35
    const y = (e.clientY - r.top  - r.height / 2) * 0.35
    el.style.transform = `translate(${x}px,${y}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <button
      ref={ref}
      onClick={openBooking}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="hidden md:flex group items-center gap-2 bg-terracotta rounded-full pl-5 pr-1.5 py-1.5 hover:bg-rust transition-colors duration-300 shadow-lg"
    >
      <span className="text-cream text-xs md:text-sm font-geist font-medium tracking-[0.12em] uppercase">
        Book Now
      </span>
      <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-cream/20 group-hover:bg-cream/30 transition-colors duration-300">
        <ArrowRight className="w-3.5 h-3.5 text-cream group-hover:translate-x-0.5 transition-transform duration-300" />
      </span>
    </button>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openBooking } = useBooking()
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-4 md:py-5 flex items-center justify-between bg-cream/85 backdrop-blur-xl transition-[box-shadow] duration-500 ${
        scrolled ? 'shadow-[0_1px_0_rgba(26,20,19,0.08)]' : ''
      }`}>
        <Link to="/" onClick={() => setMenuOpen(false)} className="relative z-50 flex-shrink-0 leading-none" aria-label="Texture Lounge — home">
          <img
            src="/assets/logo-wordmark.png"
            alt="Texture Lounge"
            className="h-9 md:h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop links with animated underline */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {LINKS.map(l => {
            const isActive = pathname === l.href
            return (
              <li key={l.href} className="relative group">
                <NavLink
                  to={l.href}
                  className={`font-geist text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-charcoal font-normal' : 'text-charcoal font-light hover:text-terracotta'
                  }`}
                >
                  {l.label}
                </NavLink>
                <span className={`absolute bottom-[-3px] left-0 h-px bg-terracotta transition-[width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </li>
            )
          })}
        </ul>

        <MagneticCTA />

        {/* Scissors menu toggle */}
        <button
          className="relative z-50 md:hidden flex items-center justify-center w-10 h-10"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <Menu
            className="absolute w-5 h-5 text-charcoal transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.77,0,0.18,1)]"
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'rotate(-45deg) scale(0.6)' : 'rotate(0deg) scale(1)',
            }}
          />
          <Scissors
            className="absolute w-5 h-5 text-charcoal transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.77,0,0.18,1)]"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'rotate(0deg) scale(1)' : 'rotate(45deg) scale(0.6)',
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-600 ease-[cubic-bezier(0.77,0,0.18,1)] ${
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        <div className={`absolute inset-0 bg-cream/98 backdrop-blur-2xl transition-opacity duration-600 ${
          menuOpen ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          {/* Location pill */}
          <div style={{
            transition: `opacity 0.5s ease ${menuOpen ? 60 : 0}ms`,
            opacity: menuOpen ? 1 : 0,
          }} className="mb-10">
            <p className="font-geist text-[0.55rem] tracking-[0.35em] uppercase text-charcoal/40 text-center">Edinburgh, Scotland</p>
          </div>

          <ul className="flex flex-col items-center gap-6 list-none w-full">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{
                transition: `opacity 0.6s ease ${menuOpen ? 80 + i * 70 : 0}ms, transform 0.6s cubic-bezier(0.19,1,0.22,1) ${menuOpen ? 80 + i * 70 : 0}ms`,
                opacity:   menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(28px)',
              }}>
                <Link
                  to={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-[2.2rem] font-light italic text-charcoal tracking-wide hover:text-terracotta transition-colors duration-300 block text-center"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Reserve CTA */}
          <div className="mt-10" style={{
            transition: `opacity 0.6s ease ${menuOpen ? 400 : 0}ms, transform 0.6s cubic-bezier(0.19,1,0.22,1) ${menuOpen ? 400 : 0}ms`,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
          }}>
            <button
              onClick={() => { setMenuOpen(false); openBooking() }}
              className="flex items-center gap-3 bg-terracotta text-cream font-geist text-xs font-semibold tracking-[0.22em] uppercase px-10 py-4 rounded-full shadow-[0_6px_28px_rgba(182,84,60,0.35)]"
            >
              Book Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Social + hours */}
          <div className="mt-10 flex flex-col items-center gap-4" style={{
            transition: `opacity 0.5s ease ${menuOpen ? 520 : 0}ms`,
            opacity: menuOpen ? 1 : 0,
          }}>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/erinestrange/" target="_blank" rel="noopener noreferrer"
                className="font-geist text-[0.55rem] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal/80 transition-colors duration-300">
                Instagram
              </a>
              <span className="w-px h-3 bg-charcoal/15" />
              <a href="https://www.tiktok.com/@erinestrange" target="_blank" rel="noopener noreferrer"
                className="font-geist text-[0.55rem] tracking-[0.3em] uppercase text-charcoal/40 hover:text-charcoal/80 transition-colors duration-300">
                TikTok
              </a>
            </div>
            <p className="font-geist text-charcoal/30 text-[0.5rem] tracking-[0.15em] text-center leading-loose">
              Open every day · 10am – 6pm
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
