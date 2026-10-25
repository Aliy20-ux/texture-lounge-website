import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Navbar        from './components/Navbar'
import Footer         from './components/Footer'
import FloatingCTA    from './components/FloatingCTA'
import ChatWidget     from './components/ChatWidget'
import PageCurtain    from './components/PageCurtain'
import CookieNotice   from './components/CookieNotice'
import LocalBusinessSchema from './components/LocalBusinessSchema'
import { BookingProvider } from './context/BookingContext'

export default function Layout() {
  const location = useLocation()

  // Scroll to top on route change — unless this navigation was a "Book Now" jump
  // from another page, in which case scroll straight to the booking section instead.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo) {
      const target = state.scrollTo
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      window.history.replaceState({}, '')
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.key])

  return (
    <BookingProvider>
      <div className="bg-cream min-h-svh">
        <LocalBusinessSchema />
        <PageCurtain routeKey={location.key} />
        <FloatingCTA />
        <Navbar />
        <Outlet />
        <Footer />
        <ChatWidget />
        <CookieNotice />
      </div>
    </BookingProvider>
  )
}
