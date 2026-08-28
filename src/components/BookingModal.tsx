import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { TREATWELL_URL } from '../data/business'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const EMBED_URL = `${TREATWELL_URL}?utm_source=widget&utm_medium=partners&utm_campaign=website_embed`

export default function BookingModal({ isOpen, onClose }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isOpen) setLoaded(false)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[9980] bg-charcoal/50 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-3 top-3 bottom-3 md:inset-x-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[min(92vw,760px)] md:h-[86vh] z-[9990] bg-cream rounded-md shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal/10 flex-shrink-0">
              <p className="font-heading italic text-charcoal text-lg">Book an appointment</p>
              <div className="flex items-center gap-5">
                <a
                  href={EMBED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 font-geist text-[0.62rem] tracking-[0.15em] uppercase text-charcoal/45 hover:text-charcoal transition-colors duration-300"
                >
                  Open in new tab <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close booking"
                  className="text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-ivory">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-terracotta/25 border-t-terracotta rounded-full animate-spin" />
                </div>
              )}
              <iframe
                src={isOpen ? EMBED_URL : undefined}
                title="Book an appointment with Texture Lounge"
                className="w-full h-full border-0"
                allow="payment"
                onLoad={() => setLoaded(true)}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
