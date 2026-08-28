import About       from '../components/About'
import Press        from '../components/Press'
import ErinSection  from '../components/ErinSection'
import Booking      from '../components/Booking'
import { useSEO } from '../lib/seo'

export default function Story() {
  useSEO(
    'Our Story | Texture Lounge Edinburgh',
    'The philosophy behind Texture Lounge and founder Erin Strange — Scottish Barber of the Year, featured on BBC Scotland.',
    '/story'
  )
  return (
    <div>
      <h1 className="sr-only">Our Story — Texture Lounge Edinburgh</h1>
      <About />
      <Press />
      <ErinSection />
      <Booking />
    </div>
  )
}
