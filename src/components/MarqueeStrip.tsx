const ITEMS = [
  'Premium Salon', 'Expert Stylists', 'Edinburgh',
  'Hot Towel Rituals', 'Colour & Cut', 'Precision Styling',
  'Reserve Your Visit', 'Est. 2026',
]

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="bg-sage overflow-hidden py-3.5">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marqueeRun 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0 inline-flex items-center gap-6 px-8 text-[0.6rem] font-geist font-normal tracking-[0.3em] uppercase text-ink">
            {item}
            <span className="w-[3px] h-[3px] rounded-full bg-ink/30 flex-shrink-0" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeRun {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
