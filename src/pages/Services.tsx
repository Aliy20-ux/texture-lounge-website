import ServicesSection  from '../components/Services'
import Experience        from '../components/Experience'
import Booking           from '../components/Booking'
import { useSEO } from '../lib/seo'

export default function ServicesPage() {
  useSEO(
    'Services & Prices | Texture Lounge Edinburgh',
    'Curly cuts, barbering, fades, beard trims and more — real services and prices at Texture Lounge, Edinburgh.',
    '/services'
  )
  return (
    <div>
      <h1 className="sr-only">Services &amp; Prices — Texture Lounge Edinburgh</h1>
      <ServicesSection />
      <Experience />
      <Booking />
    </div>
  )
}
