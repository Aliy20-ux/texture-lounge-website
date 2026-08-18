import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'texture-lounge-cookie-ack'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9960] bg-charcoal text-cream px-5 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="font-geist text-xs leading-relaxed text-cream/75 max-w-xl">
        We only use essential storage to run this site — no tracking or advertising cookies.{' '}
        <Link to="/privacy" className="text-cream underline hover:text-sage transition-colors duration-300">Read our Privacy Policy</Link>.
      </p>
      <button
        onClick={dismiss}
        className="flex-shrink-0 bg-sage text-charcoal font-geist text-[0.65rem] font-semibold tracking-[0.2em] uppercase px-6 py-2.5 rounded-full hover:bg-sage/80 transition-colors duration-300"
      >
        Got it
      </button>
    </div>
  )
}
