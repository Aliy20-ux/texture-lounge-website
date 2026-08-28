import FAQ     from '../components/FAQ'
import Booking from '../components/Booking'
import { useSEO } from '../lib/seo'

export default function FAQPage() {
  useSEO(
    'FAQ | Texture Lounge Edinburgh',
    'Answers to common questions about booking, cancellations and visiting Texture Lounge, Edinburgh.',
    '/faq'
  )
  return (
    <div>
      <h1 className="sr-only">Frequently Asked Questions — Texture Lounge Edinburgh</h1>
      <FAQ />
      <Booking />
    </div>
  )
}
