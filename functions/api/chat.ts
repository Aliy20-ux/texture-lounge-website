import { HOURS, SERVICES, PACKAGES, TEAM, ADDRESS, FAQS, TRANSPORT, MAPS_LINK, BRAND, PHONE } from '../../src/data/business'

interface Env {
  AI: Ai
  CHAT_RATE_LIMIT: KVNamespace
}

// Simple, best-effort counters (read-then-write, not atomic — fine at this traffic scale;
// worst case under heavy concurrency is a slightly loose limit, never a broken chat).
const BURST_LIMIT       = 8    // messages per visitor per minute
const BURST_WINDOW_SEC  = 60
const DAILY_LIMIT       = 25   // messages per visitor per day
const GLOBAL_DAILY_LIMIT = 400 // messages across all visitors per day
const DAY_TTL_SEC       = 90_000 // ~25h, safely covers a full UTC day

async function checkAndIncrement(kv: KVNamespace, key: string, limit: number, ttlSec: number): Promise<boolean> {
  const current = Number(await kv.get(key)) || 0
  if (current >= limit) return false
  await kv.put(key, String(current + 1), { expirationTtl: ttlSec })
  return true
}

function buildSystemPrompt(): string {
  const hoursText = HOURS.map(h => `${h.day}: ${h.label}`).join('\n')
  const servicesText = SERVICES.map(s => `${s.name} — ${s.price} (${s.dur}): ${s.desc}`).join('\n')
  const packagesText = PACKAGES.map(p => `${p.name} — ${p.price}: ${p.desc}`).join('\n')
  const teamText = TEAM.map(t => `${t.name} — ${t.role} (${t.note})`).join('\n')
  const faqText = FAQS.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')
  const transportText = TRANSPORT.map(t => `${t.label}: ${t.body}`).join('\n')

  return `You are the booking assistant for ${BRAND.name}, a barber salon in ${ADDRESS.city}. Answer questions ONLY using the facts below. Never invent prices, hours, services, staff, or reviews that are not listed here. If asked something you don't have data for, say you don't have that information and suggest calling or booking online. Keep replies short — 2-4 sentences, no markdown headers.

ADDRESS
${ADDRESS.line}, ${ADDRESS.city} ${ADDRESS.postcode}
Directions: ${MAPS_LINK}
Phone: ${PHONE.display}

HOURS
${hoursText}

SERVICES
${servicesText}

PACKAGES
${packagesText}

TEAM
${teamText}

GETTING HERE
${transportText}

FREQUENTLY ASKED QUESTIONS
${faqText}

To book an appointment, tell the user to use the "Book Now" button on the site — you cannot book directly.`
}

const MAX_MESSAGE_LENGTH = 1000
const MAX_HISTORY_TURNS = 6

function sanitizeHistory(input: unknown): { role: 'user' | 'assistant'; content: string }[] {
  if (!Array.isArray(input)) return []
  return input
    .filter((item): item is { role: unknown; content: unknown } =>
      item && typeof item === 'object' && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string'
    )
    .slice(-MAX_HISTORY_TURNS)
    .map(item => ({ role: item.role as 'user' | 'assistant', content: item.content.slice(0, MAX_MESSAGE_LENGTH) }))
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as { message?: unknown; history?: unknown }

    if (!body.message || typeof body.message !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400 })
    }
    if (body.message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ error: 'Message too long' }), { status: 400 })
    }

    const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown'
    const today = new Date().toISOString().slice(0, 10)
    const kv = context.env.CHAT_RATE_LIMIT

    const withinBurst  = await checkAndIncrement(kv, `burst:${ip}:${Math.floor(Date.now() / (BURST_WINDOW_SEC * 1000))}`, BURST_LIMIT, BURST_WINDOW_SEC + 10)
    const withinDaily  = withinBurst  && await checkAndIncrement(kv, `daily:${ip}:${today}`, DAILY_LIMIT, DAY_TTL_SEC)
    const withinGlobal = withinDaily  && await checkAndIncrement(kv, `global:${today}`, GLOBAL_DAILY_LIMIT, DAY_TTL_SEC)

    if (!withinBurst) {
      return new Response(JSON.stringify({ error: "You're sending messages a little fast — give it a minute and try again." }), { status: 429 })
    }
    if (!withinDaily) {
      return new Response(JSON.stringify({ error: "You've reached today's question limit for the chat assistant. Please call or use Book Now instead." }), { status: 429 })
    }
    if (!withinGlobal) {
      return new Response(JSON.stringify({ error: "The chat assistant is at capacity for today. Please call or use Book Now instead." }), { status: 429 })
    }

    const messages = [
      { role: 'system', content: buildSystemPrompt() },
      ...sanitizeHistory(body.history),
      { role: 'user', content: body.message },
    ]

    const response = await context.env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
      messages,
      max_tokens: 300,
    })

    const reply = (response as { response?: string }).response ?? "Sorry, I couldn't generate a reply just now."

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('chat function error:', err)
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), { status: 500 })
  }
}
