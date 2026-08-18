import Location from '../components/Location'
import FAQ       from '../components/FAQ'
import { useSEO } from '../lib/seo'

export default function FindUs() {
  useSEO(
    'Find Us | Texture Lounge Edinburgh',
    'Texture Lounge is at 12 Melville Place, Edinburgh EH3 7PR — opening hours, directions and answers to common questions.',
    '/find-us'
  )
  return (
    <div>
      <Location />
      <FAQ />
    </div>
  )
}
