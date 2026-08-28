// Loads Treatwell's official booking-widget script on demand and opens the real
// booking flow (a Treatwell popup window) for the venue. Replaces the old in-house
// booking form, which only set local state and never sent a booking anywhere.
import { TREATWELL_URL } from '../data/business'

declare global {
  interface Window {
    wahanda?: { openOnlineBookingWidget: (url: string) => void }
  }
}

const SCRIPT_SRC = 'https://widget.treatwell.co.uk/common/venue-menu/javascript/widget-button.js'

let scriptPromise: Promise<void> | null = null

function loadScript(): Promise<void> {
  if (window.wahanda) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Treatwell booking widget'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

export async function openTreatwellBooking() {
  try {
    await loadScript()
    window.wahanda?.openOnlineBookingWidget(TREATWELL_URL)
  } catch {
    // Script failed to load (offline, blocked, etc.) — fall back to a plain new tab
    // so "Book Now" still does something useful.
    window.open(TREATWELL_URL, '_blank', 'noopener,noreferrer')
  }
}
