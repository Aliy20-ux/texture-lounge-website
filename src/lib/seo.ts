import { useEffect } from 'react'
import { SITE_URL } from '../data/business'

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(path: string) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', `${SITE_URL}${path}`)
}

/** Sets the document title, meta description and canonical URL for the current page. */
export function useSEO(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setCanonical(path)
  }, [title, description, path])
}
