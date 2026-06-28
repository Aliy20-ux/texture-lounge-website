import { useEffect, useState } from 'react'

const VIDEO_WEBM = '/assets/videos/dola-removal.webm'
const VIDEO_MP4  = '/assets/videos/dola-removal.mp4'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative" style={{ height: '100dvh' }}>
      <div className="w-full h-full overflow-hidden relative">

        {/* Hero video — autoplay loop, full-bleed */}
        <video
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_WEBM} type="video/webm" />
          <source src={VIDEO_MP4}  type="video/mp4"  />
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

        {/* Warm amber breathe */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 55% at 68% 35%, rgba(212,133,42,0.1) 0%, transparent 65%)',
            animation: 'lightBreathe 9s ease-in-out infinite',
          }}
        />

        {/* Center logo — concentric sage rings + wordmark */}
        <div className="absolute inset-0 flex items-center justify-center pb-[25vh] sm:pb-[30vh] z-20">
          <div className="relative flex items-center justify-center w-[45vw] h-[45vw] max-w-[320px] max-h-[320px] md:w-[30vw] md:h-[30vw] md:max-w-[400px] md:max-h-[400px]">

            <div
              className="absolute inset-0 rounded-full border border-sage/40 transition-all duration-[1200ms] ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.75)' }}
            />

            <div
              className="absolute inset-[12%] rounded-full border border-sage/25 transition-all duration-[1200ms] ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.75)', transitionDelay: '150ms' }}
            />

            <div
              className="relative z-10 text-center text-sage leading-none transition-all duration-[1000ms] ease-out"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.9)', transitionDelay: '350ms' }}
            >
              <span className="font-heading italic text-4xl sm:text-5xl md:text-6xl block">texture</span>
              <span className="font-geist text-[0.5rem] sm:text-xs tracking-[0.55em] pl-[0.55em] mt-1 block uppercase">Lounge</span>
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
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '1050ms' }}
          >
            <a
              href="#booking"
              className="flex items-center gap-2.5 bg-sage text-charcoal font-geist text-[0.65rem] font-semibold tracking-[0.2em] uppercase px-7 py-3.5 rounded-full shadow-[0_6px_24px_rgba(123,174,142,0.4)]"
            >
              Reserve Now
            </a>
          </div>

          {/* Desktop scroll line */}
          <div
            className="mt-8 hidden md:flex flex-col items-center transition-opacity duration-[800ms] ease-out"
            style={{ opacity: visible ? 1 : 0, transitionDelay: '1200ms' }}
          >
            <div className="w-px h-10 bg-cream/25" style={{ animation: 'scrollLine 2.2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lightBreathe {
          0%,100% { opacity:0.7; } 50% { opacity:1; }
        }
        @keyframes scrollLine {
          0%,100% { transform:scaleY(1); opacity:0.3; }
          50%      { transform:scaleY(0.4); opacity:0.8; }
        }
      `}</style>
    </div>
  )
}
