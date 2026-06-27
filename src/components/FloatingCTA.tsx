import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BookingModal from './BookingModal'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed left-1/2 -translate-x-1/2 z-[9970] md:hidden"
            style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-3 bg-terracotta text-cream font-geist text-xs font-medium tracking-[0.2em] uppercase px-7 py-3.5 rounded-full shadow-[0_8px_32px_rgba(176,64,48,0.4)] hover:bg-rust transition-colors duration-300"
            >
              Reserve Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
