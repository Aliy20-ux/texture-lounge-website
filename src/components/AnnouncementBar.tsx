import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const DISMISS_KEY = 'tl-announcement-dismissed'

export default function AnnouncementBar() {
  const { openBooking } = useBooking()
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISS_KEY) === '1' } catch { return false }
  })

  const dismiss = () => {
    setDismissed(true)
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch { /* private mode etc. — fine to just re-show next load */ }
  }

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          key="announcement"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="bg-terracotta overflow-hidden"
        >
          <div className="relative flex items-center justify-center px-10 md:px-12 py-2 md:py-2.5">
            <button
              onClick={openBooking}
              className="group flex items-center gap-2 font-geist text-[0.58rem] md:text-[0.65rem] tracking-[0.1em] md:tracking-[0.14em] uppercase text-cream text-center"
            >
              <span className="hidden sm:inline">Off-Peak Offer —</span>
              Save up to 30% on selected services
              <ArrowRight className="w-3 h-3 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute right-3 md:right-5 flex items-center justify-center w-5 h-5 text-cream/70 hover:text-cream transition-colors duration-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
