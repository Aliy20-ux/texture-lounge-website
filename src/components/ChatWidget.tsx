import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const GREETING: Message = {
  role: 'assistant',
  content: "Hi — I'm the Texture Lounge assistant. Ask me about hours, services, prices, or how to find us.",
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const next = [...messages, { role: 'user', content: text } as Message]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: next.slice(1) }),
      })
      const data = await res.json() as { reply?: string; error?: string }
      setMessages(m => [...m, { role: 'assistant', content: data.reply ?? data.error ?? "Sorry, something went wrong." }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please call us or use Book Now." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Bubble trigger */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Ask a question'}
        className="fixed z-[9960] right-5 md:right-8 bottom-[7.5rem] md:bottom-24 w-13 h-13 md:w-14 md:h-14 rounded-full bg-charcoal text-cream flex items-center justify-center shadow-[0_8px_28px_rgba(26,20,19,0.3)] hover:bg-charcoal/85 transition-colors duration-300"
        style={{ width: 52, height: 52 }}
        initial={false}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[9959] left-4 right-4 md:left-auto md:right-8 md:w-96 bottom-[11.5rem] md:bottom-[10.5rem] h-[28rem] max-h-[70vh] bg-cream border border-charcoal/12 rounded-lg shadow-[0_20px_60px_rgba(26,20,19,0.25)] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-charcoal/10 bg-ivory">
              <p className="font-geist text-sage text-[0.58rem] tracking-[0.3em] uppercase mb-0.5">Texture Lounge</p>
              <p className="font-heading text-charcoal text-lg italic">Ask a question</p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-2.5 text-sm font-geist font-light leading-relaxed ${
                    m.role === 'user'
                      ? 'self-end bg-terracotta text-cream rounded-2xl rounded-br-sm'
                      : 'self-start bg-white text-charcoal/85 border border-charcoal/8 rounded-2xl rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="self-start bg-white border border-charcoal/8 rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-charcoal/30"
                      style={{ animation: `chatBounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send() }}
              className="flex items-center gap-2 px-3 py-3 border-t border-charcoal/10 bg-ivory"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about hours, prices..."
                className="flex-1 bg-transparent px-2 py-2 text-sm font-geist text-charcoal placeholder-charcoal/35 focus:outline-none"
                aria-label="Type your question"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-terracotta text-cream disabled:opacity-30 hover:bg-rust transition-colors duration-300"
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
