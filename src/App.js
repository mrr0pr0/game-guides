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
```

---

## Step 2: Create `.env` File

1. **Right-click in the root folder** (game-guides, NOT inside src) → **New File** → type `.env`
2. Add this content (we'll fill in real values later):
```
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key_here