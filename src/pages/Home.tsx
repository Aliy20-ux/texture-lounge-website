import Hero             from '../components/Hero'
import MarqueeStrip      from '../components/MarqueeStrip'
import BrandStatement    from '../components/BrandStatement'
import TestimonialStrip  from '../components/TestimonialStrip'
import PressStrip        from '../components/PressStrip'
import Booking           from '../components/Booking'
import BookingWidget     from '../components/BookingWidget'
import { useSEO } from '../lib/seo'

export default function Home() {
  useSEO(
    'Texture Lounge | Premium Barber Salon · Edinburgh',
    'Texture Lounge — where master craft meets lounge culture. Premium barbering, hot towel shaves & bespoke grooming packages in Edinburgh.',
    '/'
  )
  return (
    <div>
      <Hero />
      <MarqueeStrip />
      <BrandStatement />
      <TestimonialStrip />
      <PressStrip />
      <Booking />
      <BookingWidget />
    </div>
  )
}
