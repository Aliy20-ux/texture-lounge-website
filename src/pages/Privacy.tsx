import { useSEO } from '../lib/seo'
import { BRAND, ADDRESS, CONTACT_EMAIL } from '../data/business'
import Booking from '../components/Booking'

export default function Privacy() {
  useSEO(
    `Privacy Policy | ${BRAND.name}`,
    `How ${BRAND.name} collects, uses and protects your information.`,
    '/privacy'
  )

  return (
    <div className="bg-cream py-28 md:py-36 px-5 md:px-12">
      <div className="max-w-2xl mx-auto">
        <p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-4">Legal</p>
        <h1 className="font-heading text-charcoal text-4xl md:text-5xl font-light italic leading-tight mb-3">Privacy Policy</h1>
        <p className="font-geist text-charcoal/45 text-xs mb-14">Last updated August 2026</p>

        <div className="flex flex-col gap-10 font-geist text-charcoal/70 text-[0.9rem] leading-[1.9] font-light">
          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Who we are</h2>
            <p>{BRAND.name}, {ADDRESS.line}, {ADDRESS.city} {ADDRESS.postcode}. This policy explains what information we collect through this website, why, and what your rights are.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">What we collect</h2>
            <p className="mb-3"><strong className="text-charcoal">Booking requests.</strong> The booking widget on this site is provided by our booking partner, Treatwell, where you choose a service and time. Treatwell collects the details needed to make the booking (name, email, appointment details) directly — we don't receive or store that information ourselves. See <a href="https://www.treatwell.co.uk/info/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">Treatwell's privacy policy</a> for how they handle it.</p>
            <p><strong className="text-charcoal">Chat assistant.</strong> Messages you type into our chat widget are sent to Cloudflare's Workers AI service to generate a reply. We don't ask for personal details there, and you shouldn't share any — please don't include anything sensitive in a chat message.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Cookies and local storage</h2>
            <p>This site doesn't use advertising or analytics cookies. We store a small, non-identifying flag in your browser's local storage to remember that you've seen our cookie notice — that's it. If this changes (for example, if we add analytics in future), we'll update this policy and ask for consent where required.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Who we share it with</h2>
            <p>We don't sell your data. This site is hosted on Cloudflare, and our chat assistant runs on Cloudflare Workers AI — both process data on our behalf as part of running the site. Booking details go directly to Treatwell, our booking partner, when you book an appointment — we never see or hold that data ourselves.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">How long we keep it</h2>
            <p>We don't hold booking data ourselves — Treatwell retains it under their own policy. For anything we do hold (such as a chat message), we keep it only as long as needed to run the site. You can ask us to delete your information at any time (see below).</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Your rights</h2>
            <p>Under UK GDPR, you can ask us what information we hold about you, ask us to correct or delete it, or object to how we use it. To do any of this, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-terracotta hover:underline">{CONTACT_EMAIL}</a>.</p>
          </section>

          <section>
            <h2 className="font-heading text-charcoal text-xl italic font-normal mb-3">Changes to this policy</h2>
            <p>If how we handle your information changes, we'll update this page. Check back occasionally if you want to stay current.</p>
          </section>
        </div>
      </div>
      <Booking />
    </div>
  )
}
