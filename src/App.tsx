import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout    from './Layout'
import Home      from './pages/Home'

const Story    = lazy(() => import('./pages/Story'))
const Services = lazy(() => import('./pages/Services'))
const Team     = lazy(() => import('./pages/Team'))
const Space    = lazy(() => import('./pages/Space'))
const Reviews  = lazy(() => import('./pages/Reviews'))
const FindUs   = lazy(() => import('./pages/FindUs'))
const Privacy  = lazy(() => import('./pages/Privacy'))
const Terms    = lazy(() => import('./pages/Terms'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home ships in the main bundle — it's the most common entry point.
            Every other page is a separate chunk, loaded on demand. */}
        <Route path="/" element={<Home />} />
        <Route path="/story"     element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Story /></Suspense>} />
        <Route path="/services"  element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Services /></Suspense>} />
        <Route path="/team"      element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Team /></Suspense>} />
        <Route path="/space"     element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Space /></Suspense>} />
        <Route path="/reviews"   element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Reviews /></Suspense>} />
        <Route path="/find-us"   element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><FindUs /></Suspense>} />
        <Route path="/privacy"   element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Privacy /></Suspense>} />
        <Route path="/terms"     element={<Suspense fallback={<div className="bg-cream min-h-svh" />}><Terms /></Suspense>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
