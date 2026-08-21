// ── Single source of truth for Texture Lounge business data ──
// Used across components (Location, Booking, BookingModal, Navbar, Footer)
// and serialized into the AI chatbot's system prompt (functions/api/chat.ts).

export const BRAND = {
  name: 'Texture Lounge',
  tagline: 'Where craft meets lounge culture',
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
  { day: 'Monday',    short: 'Mon', dow: 1, open: '09:00', close: '19:00', label: '9am – 7pm'  },
  { day: 'Tuesday',   short: 'Tue', dow: 2, open: '09:00', close: '19:00', label: '9am – 7pm'  },
  { day: 'Wednesday', short: 'Wed', dow: 3, open: '09:00', close: '19:00', label: '9am – 7pm'  },
  { day: 'Thursday',  short: 'Thu', dow: 4, open: '09:00', close: '20:00', label: '9am – 8pm'  },
  { day: 'Friday',    short: 'Fri', dow: 5, open: '09:00', close: '20:00', label: '9am – 8pm'  },
  { day: 'Saturday',  short: 'Sat', dow: 6, open: '09:00', close: '19:00', label: '9am – 7pm'  },
  { day: 'Sunday',    short: 'Sun', dow: 0, open: '10:00', close: '17:00', label: '10am – 5pm' },
]

// Condensed grouping, used for compact display (Navbar mobile panel, Hero, etc.)
export const HOURS_GROUPED = [
  { day: 'Mon — Wed', time: '9am – 7pm'  },
  { day: 'Thu — Fri', time: '9am – 8pm'  },
  { day: 'Saturday',  time: '9am – 7pm'  },
  { day: 'Sunday',    time: '10am – 5pm' },
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

export const SERVICES = [
  { num: '01', name: 'The Signature Cut',     price: '£35', dur: '45 min', desc: 'Precision haircut tailored to your face shape, hair texture and lifestyle. Finished with the right products and styled to leave you completely ready.' },
  { num: '02', name: 'Beard Architecture',    price: '£25', dur: '30 min', desc: 'Sculpting, shaping and defining your beard to complement your features precisely. Clean lines, intentional structure, an immaculate finish.' },
  { num: '03', name: 'Hot Towel Shave',       price: '£40', dur: '45 min', desc: 'The full ritual. Warm towels, premium shaving cream, a straight razor, and the kind of finish that reminds you what a proper shave actually feels like.' },
  { num: '04', name: 'Cut & Beard',           price: '£55', dur: '75 min', desc: 'The Signature Cut paired with Beard Architecture — both services, done back-to-back, at their full standard. No shortcuts taken.' },
  { num: '05', name: 'Fade & Style',          price: '£35', dur: '45 min', desc: 'Low, mid or high fade, blended with studied precision and finished with styling. The clean modern look, executed properly.' },
  { num: '06', name: 'The Lounge Experience', price: '£75', dur: '90 min', desc: 'Our signature package. Signature Cut, Beard Architecture, Hot Towel finishing and a complimentary drink. The full Texture Lounge experience.' },
]

export const PACKAGES = [
  { name: 'The Full Ritual',       price: '£95',  desc: 'Lounge Experience + Scalp Treatment + Complimentary Whisky.' },
  { name: 'The Monthly Gentleman', price: '£120', desc: 'Monthly membership. Two Signature Cuts, one Beard Architecture.' },
]

export const TEAM = [
  { name: 'Erin Strange', role: 'Founder & Master Barber', note: 'Scottish Barber of the Year · BBC Scotland', img: '/assets/erin-strange.jpg' },
  { name: 'James Okafor', role: 'Senior Barber',           note: '9 years · precision & fade specialist',     img: '/assets/interior-barber.jpg' },
  { name: 'Marcus Webb',  role: 'Lead Stylist',            note: 'Beard architecture & wet shave expert',     img: '/assets/interior-lounge.jpg' },
]

export const STYLISTS = ['Erin Strange', 'James Okafor', 'Marcus Webb', 'No preference']

export const STATS = [
  { n: 14, suffix: '+', label: 'Years combined craft' },
  { n: 3,  suffix: '',  label: 'Master barbers'       },
  { n: 6,  suffix: '',  label: 'Signature services'   },
  { n: 53, suffix: '',  label: '5★ reviews'           },
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
  { name: 'Marcus T.',     score: 5, text: "I've been to salons across Edinburgh and nothing comes close. Erin has an instinct for what actually suits your face — she didn't just cut my hair, she changed the way I carry myself.", service: 'Signature Cut' },
  { name: 'Callum R.',     score: 5, text: "The hot towel shave is a full ritual. I came in stressed and left feeling completely reset. The space itself does something to you — it's genuinely unlike anywhere else.", service: 'Hot Towel Shave' },
  { name: 'David S.',      score: 5, text: "I was sceptical about spending this much on a haircut. After the first visit I understood immediately. This is not a haircut. It's an hour of being looked after properly.", service: 'The Lounge Experience' },
  { name: 'Rory M.',       score: 5, text: "Erin has been cutting my hair for six months now. She remembers exactly what I want, suggests subtle changes that always turn out to be exactly right. Outstanding.", service: 'Cut & Beard' },
  { name: 'James A.',      score: 5, text: "Came in for a beard shape up and left with the best version of myself I've looked in years. The environment alone makes it worth it — dark, warm, completely calm.", service: 'Beard Architecture' },
  { name: 'Finlay H.',     score: 5, text: "Booked for a birthday treat and it became my monthly routine. The level of attention to detail in everything — the consultation, the cut, the finish — is something I hadn't experienced before.", service: 'Fade & Style' },
]

export const FAQS = [
  {
    q: 'Do you take walk-ins?',
    a: 'Yes — walk-ins are welcome whenever we have a chair free. That said, only a booked appointment guarantees your preferred time and the barber of your choice, with the space prepared and your slot protected from the moment you arrive. For the smoothest visit we recommend reserving ahead — book online or call us directly.',
  },
  {
    q: 'How long does a visit take?',
    a: 'A Signature Cut or Beard Architecture takes around 45 minutes. A Hot Towel Shave is 45 minutes. The Lounge Experience — our full package — is 90 minutes. We build in time for the consultation and finish, so you\'re never rushed.',
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
