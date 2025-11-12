import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Games from './pages/Games'
import GamePage from './pages/GamePage'
import GuidePage from './pages/GuidePage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:slug" element={<GamePage />} />
          <Route path="/games/:slug/guides/:guideSlug" element={<GuidePage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App