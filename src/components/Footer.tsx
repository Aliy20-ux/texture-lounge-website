export default function Footer() {
  return (
    <footer className="bg-ink border-t border-cream/6 px-5 md:px-12 pt-14 pb-8 md:py-12">
      <div className="max-w-6xl mx-auto">

        {/* Mobile: stacked layout — Desktop: row layout */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-8">

          {/* Brand */}
          <div>
            <img src="/assets/logo.jpg" alt="Texture Lounge" className="h-9 w-auto object-contain mb-4 opacity-80" />
            <p className="font-geist text-cream/35 text-xs leading-relaxed max-w-xs">
              Premium hair & grooming salon in Edinburgh.<br />
              Where craft meets lounge culture.
            </p>
            {/* Social icons — mobile only, shows below brand */}
            <div className="flex items-center gap-5 mt-5 md:hidden">
              <a href="https://www.instagram.com/erinestrange/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/40 hover:text-cream/80 transition-colors duration-300 group">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span className="font-geist text-[0.6rem] tracking-[0.2em] uppercase">Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@erinestrange" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream/40 hover:text-cream/80 transition-colors duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
                </svg>
                <span className="font-geist text-[0.6rem] tracking-[0.2em] uppercase">TikTok</span>
              </a>
            </div>
          </div>

          {/* Nav links — 2 column grid on mobile */}
          <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-4 sm:gap-y-3 list-none w-full md:w-auto">
            {[['Services','#services'],['The Space','#space'],['About Us','/about.html'],['Our Team','#team'],['Book Now','#booking']].map(([l,h]) => (
              <li key={h}>
                <a href={h} className="font-geist text-cream/40 text-sm sm:text-xs tracking-[0.14em] uppercase hover:text-cream/80 transition-colors duration-200 py-1 block">{l}</a>
              </li>
            ))}
          </ul>

          {/* Desktop social + copyright */}
          <div className="hidden md:flex flex-col items-end gap-3">
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/erinestrange/" target="_blank" rel="noopener noreferrer"
                className="text-cream/30 hover:text-cream/70 transition-colors duration-300" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@erinestrange" target="_blank" rel="noopener noreferrer"
                className="text-cream/30 hover:text-cream/70 transition-colors duration-300" aria-label="TikTok">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
                </svg>
              </a>
            </div>
            <p className="font-geist text-cream/25 text-xs">© 2026 Texture Lounge</p>
            <p className="font-geist text-cream/25 text-xs">Edinburgh, Scotland</p>
          </div>
        </div>

        {/* Mobile copyright bar */}
        <div className="mt-10 pt-5 border-t border-cream/5 flex items-center justify-between md:hidden">
          <p className="font-geist text-cream/20 text-[0.55rem] tracking-[0.15em] uppercase">© 2026 Texture Lounge</p>
          <p className="font-geist text-cream/20 text-[0.55rem] tracking-[0.15em] uppercase">Edinburgh</p>
        </div>
      </div>
    </footer>
  )
}
