import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import MarqueeStrip  from './components/MarqueeStrip'
import About         from './components/About'
import Press         from './components/Press'
import Experience    from './components/Experience'
import Services      from './components/Services'
import ErinSection   from './components/ErinSection'
import Gallery       from './components/Gallery'
import Team          from './components/Team'
import Testimonials  from './components/Testimonials'
import FAQ           from './components/FAQ'
import Booking       from './components/Booking'
import Footer        from './components/Footer'
import Cursor        from './components/Cursor'
import LoadingScreen from './components/LoadingScreen'
import FloatingCTA   from './components/FloatingCTA'

export default function App() {
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
      <Gallery />
      <Team />
      <Testimonials />
      <FAQ />
      <Booking />
      <Footer />
    </div>
  )
}
