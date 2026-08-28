import TeamSection from '../components/Team'
import Booking     from '../components/Booking'
import { useSEO } from '../lib/seo'

export default function TeamPage() {
  useSEO(
    'Our Barbers | Texture Lounge Edinburgh',
    'Meet the master barbers at Texture Lounge, Edinburgh — curly cuts, fades and precision barbering.',
    '/team'
  )
  return (
    <div>
      <h1 className="sr-only">Our Barbers — Texture Lounge Edinburgh</h1>
      <TeamSection />
      <Booking />
    </div>
  )
}
