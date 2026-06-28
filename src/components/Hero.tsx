import { useEffect, useRef, useState } from 'react'

const VIDEO_1_WEBM = '/assets/videos/hero-loop-hq.webm'
const VIDEO_1_MP4  = '/assets/videos/hero-loop-hq.mp4'
const VIDEO_2_MP4  = '/assets/videos/hero-scroll.mp4'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const wasScrolled = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      setScrolled(isScrolled)
      const v = video2Ref.current
      if (!v) return
      if (isScrolled && !wasScrolled.current) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else if (!isScrolled && wasScrolled.current) {
        v.pause()
      }
      wasScrolled.current = isScrolled
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative h-[200dvh]">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">

        {/* Video 2 — behind, plays when scrolled */}
        <video
          ref={video2Ref}
          muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_2_MP4} type="video/mp4" />
          <source src={VIDEO_1_MP4} type="video/mp4" />
        </video>

        {/* Video 1 — on top, loops, fades out on scroll */}
        <video
          autoPlay muted loop playsInline preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <source src={VIDEO_1_WEBM} type="video/webm" />
          <source src={VIDEO_1_MP4}  type="video/mp4"  />
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(180deg, rgba(18,10,6,0.55) 0%, rgba(18,10,6,0.15) 40%, rgba(18,10,6,0.65) 100%)' }}
        />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(18,10,6,0.55) 100%)' }}
        />

        {/* Center logo with concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pb-[25vh] sm:pb-[30vh] z-20">
          <div className="relative flex items-center justify-center w-[45vw] h-[45vw] max-w-[320px] max-h-[320px] md:w-[30vw] md:h-[30vw] md:max-w-[400px] md:max-h-[400px]">

            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border border-sage/40 transition-all duration-[1200ms] ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.75)',
              }}
            />

            {/* Inner ring */}
            <div
              className="absolute inset-[12%] rounded-full border border-sage/25 transition-all duration-[1200ms] ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.75)',
                transitionDelay: '150ms',
              }}
            />

            {/* Logo image */}
            <div
              className="relative z-10 transition-all duration-[1000ms] ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.9)',
                transitionDelay: '350ms',
              }}
            >
              <img
                src="/assets/logo.jpg"
                alt="Texture Lounge"
                className="w-20 h-20 md:w-28 md:h-28 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom text block */}
        <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-12 md:pb-16 px-5 sm:px-6 md:px-12 text-center z-20">

          <p
            className="font-geist text-[0.55rem] md:text-xs tracking-[0.4em] uppercase text-cream/50 mb-5 md:mb-8 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '500ms' }}
          >
            Hair · Grooming · Ritual · Edinburgh
          </p>

          <h1
            className="font-heading text-cream text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-wide transition-all duration-[1000ms] ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transitionDelay: '600ms',
            }}
          >
            Where craft meets<br />
            <em>quiet luxury</em>
          </h1>

          <p
            className="mt-3 sm:mt-4 md:mt-6 text-cream/70 font-geist font-light text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed transition-all duration-[1000ms] ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '850ms',
            }}
          >
            Edinburgh's boutique barber lounge — precision grooming in a warm, unhurried space.
          </p>

          {/* Mobile CTA */}
          <div
            className="mt-6 flex md:hidden justify-center transition-all duration-[800ms] ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '1050ms',
            }}
          >
            <a
              href="#booking"
              className="flex items-center gap-2.5 bg-sage text-charcoal font-geist text-[0.65rem] font-semibold tracking-[0.2em] uppercase px-7 py-3.5 rounded-full shadow-[0_6px_24px_rgba(123,174,142,0.4)]"
            >
              Reserve Now
            </a>
          </div>

          {/* Desktop scroll indicator */}
          <div
            className="mt-8 hidden md:flex flex-col items-center transition-opacity duration-[800ms] ease-out"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '1200ms' }}
          >
            <div className="w-px h-10 bg-cream/25" style={{ animation: 'scrollLine 2.2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%,100% { transform:scaleY(1); opacity:0.3; }
          50%      { transform:scaleY(0.4); opacity:0.8; }
        }
      `}</style>
    </div>
  )
}
