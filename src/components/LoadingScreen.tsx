import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>('loading')

  useEffect(() => {
    // Hold loading screen for 2s, then slide out
    const t1 = setTimeout(() => setPhase('exit'), 2000)
    const t2 = setTimeout(() => setPhase('done'), 3100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      {(phase === 'loading' || phase === 'exit') && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9995] bg-ink flex flex-col items-center justify-center"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          animate={phase === 'exit'
            ? { clipPath: 'inset(0 0 100% 0)' }
            : { clipPath: 'inset(0 0 0 0)' }
          }
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Outer ring — pulses */}
          <motion.div
            className="absolute rounded-full border border-cream/10"
            style={{ width: 'min(80vw, 320px)', height: 'min(80vw, 320px)' }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Mid ring */}
          <motion.div
            className="absolute rounded-full border border-amber/15"
            style={{ width: 'min(55vw, 220px)', height: 'min(55vw, 220px)' }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Rotating arc */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'min(67vw, 270px)',
              height: 'min(67vw, 270px)',
              border: '1px solid transparent',
              borderTopColor: 'rgba(176,64,48,0.6)',
              borderRightColor: 'rgba(176,64,48,0.15)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, ease: 'linear', repeat: Infinity }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          >
            <img
              src="/assets/logo.jpg"
              alt="Texture Lounge"
              className="w-28 h-28 object-contain"
            />

            {/* Name beneath logo */}
            <div className="flex flex-col items-center gap-1">
              <motion.p
                className="font-heading text-cream text-xl italic font-light tracking-[0.12em]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                Texture Lounge
              </motion.p>
              <motion.p
                className="font-geist text-cream/35 text-[0.55rem] tracking-[0.45em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                Edinburgh · Est. 2026
              </motion.p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-px bg-cream/10 overflow-hidden"
          >
            <motion.div
              className="h-full bg-terracotta/70"
              initial={{ width: '0%' }}
              animate={{ width: phase === 'exit' ? '100%' : '75%' }}
              transition={{ duration: phase === 'exit' ? 0.2 : 1.8, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
