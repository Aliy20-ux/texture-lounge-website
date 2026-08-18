import TeamSection from '../components/Team'
import { useSEO } from '../lib/seo'

export default function TeamPage() {
  useSEO(
    'Our Barbers | Texture Lounge Edinburgh',
    'Meet the master barbers at Texture Lounge, Edinburgh — precision cuts, fades, beard architecture and wet shaves.',
    '/team'
  )
  return (
    <div>
      <TeamSection />
    </div>
  )
}
