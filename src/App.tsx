import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout    from './Layout'
import Home      from './pages/Home'

const loaders = {
  Story:    () => import('./pages/Story'),
  Services: () => import('./pages/Services'),
  Team:     () => import('./pages/Team'),
  Space:    () => import('./pages/Space'),
  Reviews:  () => import('./pages/Reviews'),
  FindUs:   () => import('./pages/FindUs'),
  FAQPage:  () => import('./pages/FAQPage'),
  Privacy:  () => import('./pages/Privacy'),
  Terms:    () => import('./pages/Terms'),
}

const Story    = lazy(loaders.Story)
const Services = lazy(loaders.Services)
const Team     = lazy(loaders.Team)
const Space    = lazy(loaders.Space)
const Reviews  = lazy(loaders.Reviews)
const FindUs   = lazy(loaders.FindUs)
const FAQPage  = lazy(loaders.FAQPage)
const Privacy  = lazy(loaders.Privacy)
const Terms    = lazy(loaders.Terms)

export default function App() {
  // Page chunks are tiny — fetch them all once the browser is idle so navigating
  // between pages never waits on the network.
  useEffect(() => {
    const prefetch = () => Object.values(loaders).forEach(load => { load().catch(() => {}) })
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(prefetch, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home ships in the main bundle — it's the most common entry point.
            Every other page is a separate chunk, prefetched on idle. */}
        <Route path="/" element={<Home />} />
        <Route path="/story"     element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Story /></Suspense>} />
        <Route path="/services"  element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Services /></Suspense>} />
        <Route path="/team"      element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Team /></Suspense>} />
        <Route path="/space"     element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Space /></Suspense>} />
        <Route path="/reviews"   element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Reviews /></Suspense>} />
        <Route path="/find-us"   element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><FindUs /></Suspense>} />
        <Route path="/faq"       element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><FAQPage /></Suspense>} />
        <Route path="/privacy"   element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Privacy /></Suspense>} />
        <Route path="/terms"     element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Terms /></Suspense>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
