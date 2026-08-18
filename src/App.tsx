import { Routes, Route, Navigate } from 'react-router-dom'
import Layout    from './Layout'
import Home      from './pages/Home'
import Story     from './pages/Story'
import Services  from './pages/Services'
import Team      from './pages/Team'
import Space     from './pages/Space'
import FindUs    from './pages/FindUs'
import Privacy   from './pages/Privacy'
import Terms     from './pages/Terms'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"          element={<Home />} />
        <Route path="/story"     element={<Story />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/team"      element={<Team />} />
        <Route path="/space"     element={<Space />} />
        <Route path="/find-us"   element={<FindUs />} />
        <Route path="/privacy"   element={<Privacy />} />
        <Route path="/terms"     element={<Terms />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
