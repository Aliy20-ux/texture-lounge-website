import Location from '../components/Location'
import Booking   from '../components/Booking'
import { useSEO } from '../lib/seo'

export default function FindUs() {
  useSEO(
    'Find Us | Texture Lounge Edinburgh',
    'Texture Lounge is at 12 Melville Place, Edinburgh EH3 7PR — opening hours and directions.',
    '/find-us'
  )
  return (
    <div>
      <h1 className="sr-only">Find Us — Texture Lounge Edinburgh</h1>
      <Location />
      <Booking />
    </div>
  )
}
