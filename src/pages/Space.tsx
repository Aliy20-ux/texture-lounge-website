import Gallery from '../components/Gallery'
import { useSEO } from '../lib/seo'

export default function Space() {
  useSEO(
    'The Space | Texture Lounge Edinburgh',
    'A look inside Texture Lounge — the interior, the craft, and the clientele.',
    '/space'
  )
  return (
    <div>
      <h1 className="sr-only">The Space — Texture Lounge Edinburgh</h1>
      <Gallery />
    </div>
  )
}
