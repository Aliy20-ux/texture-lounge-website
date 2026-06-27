import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check } from 'lucide-react'

const SERVICES = [
  'The Signature Cut', 'Beard Architecture', 'Hot Towel Shave',
  'Cut & Beard', 'Fade & Style', 'The Lounge Experience',
  'The Full Ritual', 'The Monthly Gentleman',
]
const STYLISTS = ['Erin Strange', 'James Okafor', 'Marcus Webb', 'No preference']

interface Props { isOpen: boolean; onClose: () => void }

export default function BookingModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', service: '', stylist: '', date: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const close = () => { onClose(); setTimeout(() => { setStep(1); setSubmitted(false); setForm({ name: '', email: '', service: '', stylist: '', date: '', notes: '' }) }, 500) }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9980] bg-ink/80 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[9985] w-full max-w-lg bg-charcoal border-l border-cream/8 overflow-y-auto"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-charcoal/95 backdrop-blur-md border-b border-cream/6 px-8 py-6 flex items-start justify-between z-10">
              <div>
                <p className="font-geist text-sage text-[0.6rem] tracking-[0.35em] uppercase mb-1">Texture Lounge</p>
                <h3 className="font-heading text-cream text-2xl italic font-normal">Reserve Your Visit</h3>
              </div>
              <button onClick={close} className="w-9 h-9 flex items-center justify-center border border-cream/15 hover:border-cream/40 text-cream/50 hover:text-cream transition-all duration-300 mt-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-8 py-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2].map(s => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[0.55rem] font-geist transition-all duration-300 ${
                          step >= s ? 'border-terracotta bg-terracotta/20 text-cream' : 'border-cream/20 text-cream/30'
                        }`}>{s}</div>
                        {s < 2 && <div className={`w-8 h-px transition-all duration-500 ${step > s ? 'bg-terracotta/40' : 'bg-cream/10'}`} />}
                      </div>
                    ))}
                    <span className="font-geist text-cream/30 text-[0.6rem] tracking-wider ml-2 uppercase">
                      {step === 1 ? 'Choose service' : 'Your details'}
                    </span>
                  </div>

                  {step === 1 && (
                    <motion.div
                      className="flex flex-col gap-6"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    >
                      {/* Service */}
                      <div className="flex flex-col gap-3">
                        <label className="font-geist text-cream/50 text-[0.65rem] tracking-[0.25em] uppercase">Service</label>
                        <div className="grid grid-cols-1 gap-2">
                          {SERVICES.map(s => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => set('service', s)}
                              className={`text-left px-4 py-3 border text-sm font-geist font-light transition-all duration-300 ${
                                form.service === s
                                  ? 'border-terracotta/60 bg-terracotta/8 text-cream'
                                  : 'border-cream/8 text-cream/55 hover:border-cream/25 hover:text-cream/80'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Stylist */}
                      <div className="flex flex-col gap-3">
                        <label className="font-geist text-cream/50 text-[0.65rem] tracking-[0.25em] uppercase">Preferred Stylist</label>
                        <div className="grid grid-cols-2 gap-2">
                          {STYLISTS.map(s => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => set('stylist', s)}
                              className={`text-left px-4 py-3 border text-xs font-geist font-light transition-all duration-300 ${
                                form.stylist === s
                                  ? 'border-terracotta/60 bg-terracotta/8 text-cream'
                                  : 'border-cream/8 text-cream/55 hover:border-cream/25'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!form.service || !form.stylist}
                        onClick={() => setStep(2)}
                        className="flex items-center justify-center gap-3 bg-terracotta text-cream font-geist text-xs tracking-[0.2em] uppercase py-4 disabled:opacity-30 hover:bg-rust transition-colors duration-300 mt-2"
                      >
                        Continue <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      className="flex flex-col gap-5"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    >
                      {/* Summary */}
                      <div className="border border-terracotta/20 bg-terracotta/5 px-5 py-4 flex items-center justify-between">
                        <span className="font-heading italic text-cream text-sm">{form.service}</span>
                        <span className="font-geist text-cream/40 text-xs">{form.stylist}</span>
                      </div>

                      {[
                        { label: 'Full Name',     key: 'name',  type: 'text',  placeholder: 'Your name' },
                        { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                        { label: 'Preferred Date',key: 'date',  type: 'date',  placeholder: '' },
                      ].map(f => (
                        <div key={f.key} className="flex flex-col gap-2">
                          <label className="font-geist text-cream/50 text-[0.65rem] tracking-[0.25em] uppercase">{f.label}</label>
                          <input
                            type={f.type}
                            required
                            placeholder={f.placeholder}
                            value={form[f.key as keyof typeof form]}
                            onChange={e => set(f.key as keyof typeof form, e.target.value)}
                            className="bg-transparent border border-cream/12 px-4 py-3 text-cream font-geist text-sm font-light placeholder-cream/25 focus:outline-none focus:border-cream/35 transition-colors duration-300"
                            style={{ colorScheme: 'dark' }}
                          />
                        </div>
                      ))}

                      <div className="flex flex-col gap-2">
                        <label className="font-geist text-cream/50 text-[0.65rem] tracking-[0.25em] uppercase">Notes (optional)</label>
                        <textarea
                          rows={3}
                          placeholder="Anything you'd like us to know..."
                          value={form.notes}
                          onChange={e => set('notes', e.target.value)}
                          className="bg-transparent border border-cream/12 px-4 py-3 text-cream font-geist text-sm font-light placeholder-cream/25 focus:outline-none focus:border-cream/35 transition-colors duration-300 resize-none"
                        />
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button type="button" onClick={() => setStep(1)}
                          className="px-6 py-4 border border-cream/12 text-cream/50 font-geist text-xs tracking-wider uppercase hover:border-cream/30 hover:text-cream/80 transition-all duration-300">
                          Back
                        </button>
                        <button type="submit"
                          disabled={!form.name || !form.email || !form.date}
                          className="flex-1 flex items-center justify-center gap-3 bg-terracotta hover:bg-rust text-cream font-geist text-xs tracking-[0.2em] uppercase py-4 transition-colors duration-300 disabled:opacity-30">
                          Request Booking <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div
                  className="flex flex-col items-center text-center gap-6 py-12"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="w-16 h-16 rounded-full border border-sage/40 flex items-center justify-center">
                    <Check className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h4 className="font-heading text-cream text-2xl italic mb-2">Request Received</h4>
                    <p className="font-geist text-cream/50 text-sm font-light leading-relaxed max-w-xs mx-auto">
                      We'll confirm your appointment for <em className="text-cream/80 not-italic">{form.service}</em> with {form.stylist} by email within 2 hours.
                    </p>
                  </div>
                  <button onClick={close}
                    className="mt-4 font-geist text-[0.65rem] tracking-[0.3em] uppercase text-cream/40 hover:text-cream transition-colors duration-300">
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
