import Hero             from '../components/Hero'
import MarqueeStrip      from '../components/MarqueeStrip'
import BrandStatement    from '../components/BrandStatement'
import TestimonialStrip  from '../components/TestimonialStrip'
import PressStrip        from '../components/PressStrip'
import Booking           from '../components/Booking'

export default function Home() {
  return (
    <div>
      <Hero />
      <MarqueeStrip />
      <BrandStatement />
      <TestimonialStrip />
      <PressStrip />
      <Booking />
    </div>
  )
}
