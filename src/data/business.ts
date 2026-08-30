// ── Single source of truth for Texture Lounge business data ──
// Used across components (Location, Booking, Navbar, Footer)
// and serialized into the AI chatbot's system prompt (functions/api/chat.ts).

export const BRAND = {
  name: 'Texture Lounge',
  tagline: 'Premium Curly Hair Salon',
  city: 'Edinburgh',
  established: 2026,
}

// TODO: replace with the real production domain once one is connected (currently the .pages.dev URL).
export const SITE_URL = 'https://texture-lounge-website.pages.dev'

// TODO: replace with a real, monitored inbox before relying on this for data requests.
export const CONTACT_EMAIL = 'hello@texturelounge.co.uk'

export const PHONE = {
  display: '0131 248 7575',
  tel: '+441312487575',
}

export const TREATWELL_URL = 'https://widget.treatwell.co.uk/place/539710/menu/'

export const ADDRESS = {
  line: '12 Melville Place',
  city: 'Edinburgh',
  postcode: 'EH3 7PR',
}

export const MAPS_QUERY = `${ADDRESS.line}, ${ADDRESS.city} ${ADDRESS.postcode}`
export const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=17&output=embed`
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`

// day: 0 = Sunday ... 6 = Saturday (matches Date.getDay())
export const HOURS = [
  { day: 'Monday',    short: 'Mon', dow: 1, open: '10:00', close: '18:00', label: '10am – 6pm' },
  { day: 'Tuesday',   short: 'Tue', dow: 2, open: '10:00', close: '18:00', label: '10am – 6pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, open: '10:00', close: '18:00', label: '10am – 6pm' },
  { day: 'Thursday',  short: 'Thu', dow: 4, open: '10:00', close: '18:00', label: '10am – 6pm' },
  { day: 'Friday',    short: 'Fri', dow: 5, open: '10:00', close: '18:00', label: '10am – 6pm' },
  { day: 'Saturday',  short: 'Sat', dow: 6, open: '10:00', close: '18:00', label: '10am – 6pm' },
  { day: 'Sunday',    short: 'Sun', dow: 0, open: '10:00', close: '18:00', label: '10am – 6pm' },
]

// Condensed grouping, used for compact display (Navbar mobile panel, Hero, etc.)
export const HOURS_GROUPED = [
  { day: 'Every day', time: '10am – 6pm' },
]

/** Returns { open, label } — whether the salon is open right now, and a short display label. */
export function isOpenNow(date = new Date()): { open: boolean; label: string } {
  const dow = date.getDay()
  const today = HOURS.find(h => h.dow === dow)!
  const minutesNow = date.getHours() * 60 + date.getMinutes()
  const [oh, om] = today.open.split(':').map(Number)
  const [ch, cm] = today.close.split(':').map(Number)
  const openMinutes  = oh * 60 + om
  const closeMinutes = ch * 60 + cm
  const open = minutesNow >= openMinutes && minutesNow < closeMinutes

  if (open) return { open: true, label: `Open now · Closes ${formatHour(ch, cm)}` }
  return { open: false, label: `Closed · Opens ${formatHour(oh, om)}` }
}

function formatHour(h: number, m: number) {
  const period = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${h12}${period}` : `${h12}:${String(m).padStart(2, '0')}${period}`
}

// Pulled directly from the real Treatwell menu (widget.treatwell.co.uk/place/539710) —
// names/prices/durations are the source of truth, only obvious typos in the original
// listing ("Haicut", "Tansformation") have been corrected for display.
export const SERVICE_CATEGORIES = [
  {
    name: 'Curly Services',
    services: [
      { name: 'Curly Texture Cut, Wash & Style',     price: 'From £101.50', dur: '1 hr 45 min' },
      { name: 'Texture Transformation Wash & Style', price: 'From £35',     dur: '1 hr 20 min' },
    ],
  },
  {
    name: 'Barbering',
    services: [
      { name: "Men's Haircut",            price: 'From £14',   dur: '30–50 min' },
      { name: 'Beard Trim',               price: 'From £7',    dur: '10–15 min' },
      { name: 'The Texture Cut and Wash', price: 'From £30',   dur: '45 min – 1 hr 5 min' },
      { name: 'Line Up Only',             price: 'From £7',    dur: '10 min' },
      { name: 'Line Up Relaxer',          price: 'From £7',    dur: '25 min' },
      { name: '7 Days+ Enhancements',     price: 'From £3.50', dur: '35 min' },
      { name: 'The Texture Experience',   price: 'From £55',   dur: '1 hr 5 min – 1 hr 25 min' },
      { name: 'Facial',                   price: '£25',        dur: '20 min' },
      { name: 'Hot Towel',                price: '£5',         dur: '5 min' },
      { name: 'Bald Haircuts',            price: 'From £20',   dur: '20–30 min' },
    ],
  },
]

// Real staff, pulled from the professional list in Treatwell's own booking flow
// (widget.treatwell.co.uk/place/539710) — Treatwell only exposes first names and no
// role/specialty detail for anyone but Erin, so those fields stay generic rather than
// invented. No photo on file for these four — img is left unset, not filled with a stand-in.
export const TEAM = [
  { name: 'Erin Strange', role: 'Founder & Master Barber · Curly Hair Specialist', note: 'Scottish Barber of the Year · BBC Scotland', img: '/assets/erin-strange.jpg' },
  { name: 'Ryan',   role: 'Master Barber', note: '', img: null },
  { name: 'Mo',     role: 'Master Barber', note: '', img: null },
  { name: 'Robert', role: 'Master Barber', note: '', img: null },
]

export const STATS: { n: number; suffix: string; label: string; href?: string }[] = [
  { n: 17, suffix: '+', label: 'Years experience' },
  { n: 4,  suffix: '', label: 'Master barbers', href: '/team' },
  { n: 12, suffix: '', label: 'Services offered' },
  { n: 53, suffix: '', label: '5★ reviews' },
]

export const TRANSPORT = [
  {
    label: 'By Bus',
    body: 'Lothian Buses 3, 4, 25, 33 & 44 stop on Shandwick Place, a two-minute walk from the door. Night services N3, N25 & N44 also serve the West End.',
  },
  {
    label: 'By Tram',
    body: 'The West End tram stop is moments away on Shandwick Place — a direct line from Edinburgh Airport through the city centre.',
  },
  {
    label: 'By Train',
    body: 'Haymarket Station is a 10-minute walk west; Edinburgh Waverley a short tram ride or 15-minute stroll to the east.',
  },
]

export const REVIEWS = [
  { name: 'Marcus T.',     score: 5, text: "I've been to salons across Edinburgh and nothing comes close. Erin has an instinct for what actually suits your face — she didn't just cut my hair, she changed the way I carry myself.", service: "Men's Haircut" },
  { name: 'Callum R.',     score: 5, text: "The hot towel finish is a full ritual. I came in stressed and left feeling completely reset. The space itself does something to you — it's genuinely unlike anywhere else.", service: 'Hot Towel' },
  { name: 'David S.',      score: 5, text: "I was sceptical about spending this much on a haircut. After the first visit I understood immediately. This is not a haircut. It's an hour of being looked after properly.", service: 'The Texture Experience' },
  { name: 'Rory M.',       score: 5, text: "Erin has been cutting my hair for six months now. She remembers exactly what I want, suggests subtle changes that always turn out to be exactly right. Outstanding.", service: 'The Texture Cut and Wash' },
  { name: 'Yohan E.',      score: 5, text: "Dr. Strange is a versatile and talented barber. Ive been a regular customer for over a year now and always goes above and beyond for the various hairstyles I've requested.", service: 'Google Review' },
  { name: 'Asim N.',       score: 5, text: "Highly recommend, insane barber knows how to cut all types of hair especially curly hair 🙏u will leave the shop lookin fresh", service: 'Google Review' },
]

export const FAQS = [
  {
    q: 'Do you take walk-ins?',
    a: 'Yes — walk-ins are welcome whenever we have a chair free. That said, only a booked appointment guarantees your preferred time and the barber of your choice, with the space prepared and your slot protected from the moment you arrive. For the smoothest visit we recommend reserving ahead — book online or call us directly.',
  },
  {
    q: 'How long does a visit take?',
    a: 'It depends on the service — a Men\'s Haircut is 30–50 minutes, while a full Curly Texture Cut, Wash & Style runs around 1 hr 45. We build in time for the consultation and finish, so you\'re never rushed.',
  },
  {
    q: 'What should I do before my appointment?',
    a: 'Just come as you are. Clean or unstyled hair is slightly easier to assess, but it\'s not a requirement. We\'ll take care of everything else. If you have reference images or ideas, bring them — they help.',
  },
  {
    q: 'Do you have a cancellation policy?',
    a: 'We ask for at least 24 hours\' notice for cancellations or rescheduling. Late cancellations (under 12 hours) may be subject to a 50% charge. We hold your spot exclusively — it matters.',
  },
  {
    q: 'Is Texture Lounge for everyone?',
    a: 'Absolutely. We welcome all hair types, textures, lengths, and clients. Our expertise spans cuts, colour, fades, and grooming for all. If you\'re unsure whether we can help, just get in touch before booking.',
  },
  {
    q: 'Where exactly are you based in Edinburgh?',
    a: `We're at ${ADDRESS.line}, ${ADDRESS.city} ${ADDRESS.postcode} — in the West End, moments from Shandwick Place. Any questions, call or message us directly.`,
  },
]
