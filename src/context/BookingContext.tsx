import { createContext, useContext, type ReactNode } from 'react'
import { openTreatwellBooking } from '../lib/treatwell'

interface BookingContextValue {
  openBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  return (
    <BookingContext.Provider value={{ openBooking: openTreatwellBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
