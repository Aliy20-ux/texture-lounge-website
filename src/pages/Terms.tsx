import { useSEO } from '../lib/seo'
import { BRAND, ADDRESS, CONTACT_EMAIL } from '../data/business'

export default function Terms() {
  useSEO(
    `Terms of Service | ${BRAND.name}`,
    `Booking, cancellation and general terms for ${BRAND.name}.`,
    '/terms'
  )

  return (
    <div className="bg-cream py-28 md:py-36 px-5 md:px-12">
      <div className="max-w-2xl mx-auto">
        <p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4">Legal</p>
        <h1 className="font-heading text-charcoal text-4xl md:text-5xl font-light italic leading-tight mb-3">Terms of Service</h1>
        <p className="font-geist text-charcoal/45 text-xs mb-14">Last updated August 2026</p>

        <div className="flex flex-col gap-10 font-geist text-charcoal/70 text-[0.9rem] leading-[1.9] font-light">
          <section>
            <p>These terms cover appointments and general use of the {BRAND.name} website, {ADDRESS.line}, {ADDRESS.city} {ADDRESS.postcode}. By booking with us or using this site, you agree to them.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Bookings</h2>
            <p>Submitting the booking form is a request, not a confirmed appointment — we'll confirm by email or phone. Walk-ins are welcome whenever a chair is free, but only a confirmed booking guarantees your preferred time and barber.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Cancellations</h2>
            <p>We ask for at least 24 hours' notice to cancel or reschedule. Cancellations with less than 12 hours' notice may be subject to a 50% charge. This lets us offer your slot to someone else in good time.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Pricing</h2>
            <p>Prices shown on this site are current at time of publishing and may change. You'll always be quoted the price for your service before it begins.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">The chat assistant</h2>
            <p>Our chat widget is an automated assistant that answers from our published hours, prices and services. It's a convenience, not a substitute for a confirmed booking or professional advice — if anything it tells you seems off, please call or use the booking form directly.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Liability</h2>
            <p>We take reasonable care in everything we publish here, but this site is provided as-is and we can't guarantee it will always be available or error-free.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Contact</h2>
            <p>Questions about these terms — <a href={`mailto:${CONTACT_EMAIL}`} className="text-terracotta hover:underline">{CONTACT_EMAIL}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
