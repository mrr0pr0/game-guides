import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="container-page">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 rounded group-hover:bg-red-500 transition-all duration-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="font-black text-2xl tracking-tight">GAD<span className="text-red-600">Guide</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors">Home</Link>
            <Link to="/games" className="text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors">Games</Link>
            <Link to="/" className="text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors">Walkthroughs</Link>
            <Link to="/" className="text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors">Reviews</Link>
            <button className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors">
              Search
            </button>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="container-page py-4 space-y-3">
            <Link to="/" className="block text-sm font-bold uppercase tracking-wider hover:text-red-500">Home</Link>
            <Link to="/games" className="block text-sm font-bold uppercase tracking-wider hover:text-red-500">Games</Link>
            <Link to="/" className="block text-sm font-bold uppercase tracking-wider hover:text-red-500">Walkthroughs</Link>
            <Link to="/" className="block text-sm font-bold uppercase tracking-wider hover:text-red-500">Reviews</Link>
          </div>
        </div>
      )}

      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
    </header>
  )
}

export default Header