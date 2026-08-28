import { createContext, useContext, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface BookingContextValue {
  openBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

// The live Treatwell widget on Home — the actual place a "Book Now" click should land.
const BOOKING_SECTION_ID = 'booking-widget'

export function BookingProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  const openBooking = () => {
    if (location.pathname === '/') {
      document.getElementById(BOOKING_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: BOOKING_SECTION_ID } })
    }
  }

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
