import Location from '../components/Location'
import FAQ       from '../components/FAQ'
import Booking   from '../components/Booking'
import { useSEO } from '../lib/seo'

export default function FindUs() {
  useSEO(
    'Find Us | Texture Lounge Edinburgh',
    'Texture Lounge is at 12 Melville Place, Edinburgh EH3 7PR — opening hours, directions and answers to common questions.',
    '/find-us'
  )
  return (
    <div>
      <h1 className="sr-only">Find Us — Texture Lounge Edinburgh</h1>
      <Location />
      <FAQ />
      <Booking />
    </div>
  )
}
