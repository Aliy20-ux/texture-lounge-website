import Hero             from '../components/Hero'
import BookingWidget     from '../components/BookingWidget'
import BrandStatement    from '../components/BrandStatement'
import TestimonialStrip  from '../components/TestimonialStrip'
import { useSEO } from '../lib/seo'

export default function Home() {
  useSEO(
    'Texture Lounge | Premium Curly Hair Salon · Edinburgh',
    'Texture Lounge — Edinburgh\'s premium curly hair salon and barbershop. Real prices, live booking, 12 Melville Place.',
    '/'
  )
  return (
    <div>
      <Hero />
      <BookingWidget />
      <BrandStatement />
      <TestimonialStrip />
    </div>
  )
}
