import { useEffect } from 'react'
import Lenis from 'lenis'

import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import MarqueeStrip    from './components/MarqueeStrip'
import About           from './components/About'
import Press           from './components/Press'
import Experience      from './components/Experience'
import Services        from './components/Services'
import ErinSection     from './components/ErinSection'
import CraftShowcase   from './components/CraftShowcase'
import Gallery         from './components/Gallery'
import Team            from './components/Team'
import Testimonials    from './components/Testimonials'
import FAQ             from './components/FAQ'
import Booking         from './components/Booking'
import Footer          from './components/Footer'
import Cursor          from './components/Cursor'
import LoadingScreen   from './components/LoadingScreen'
import FloatingCTA     from './components/FloatingCTA'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-ink min-h-screen">
      <LoadingScreen />
      <Cursor />
      <FloatingCTA />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <About />
      <Press />
      <Experience />
      <Services />
      <ErinSection />
      <CraftShowcase />
      <Gallery />
      <Team />
      <Testimonials />
      <FAQ />
      <Booking />
      <Footer />
    </div>
  )
}
