import { useEffect } from 'react'
import { BRAND, ADDRESS, HOURS, SITE_URL, PHONE } from '../data/business'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'HairSalon',
      name: BRAND.name,
      description: BRAND.tagline,
      url: SITE_URL,
      telephone: PHONE.tel,
      image: `${SITE_URL}/assets/interior-lounge.jpg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.line,
        addressLocality: ADDRESS.city,
        postalCode: ADDRESS.postcode,
        addressCountry: 'GB',
      },
      openingHoursSpecification: HOURS.map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_NAMES[h.dow],
        opens: h.open,
        closes: h.close,
      })),
      priceRange: '££',
      sameAs: [
        'https://www.instagram.com/erinestrange/',
        'https://www.tiktok.com/@erinestrange',
      ],
    }

    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify(schema)
    document.head.appendChild(el)

    return () => { document.head.removeChild(el) }
  }, [])

  return null
}
