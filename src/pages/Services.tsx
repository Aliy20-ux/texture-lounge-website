import ServicesSection  from '../components/Services'
import Experience        from '../components/Experience'
import { useSEO } from '../lib/seo'

export default function ServicesPage() {
  useSEO(
    'Services & Prices | Texture Lounge Edinburgh',
    'Signature cuts, beard architecture, hot towel shaves and grooming packages — services and prices at Texture Lounge, Edinburgh.',
    '/services'
  )
  return (
    <div>
      <h1 className="sr-only">Services &amp; Prices — Texture Lounge Edinburgh</h1>
      <ServicesSection />
      <Experience />
    </div>
  )
}
