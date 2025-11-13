import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-sm">
    <div className="bg-black text-white">
    <div className="container-page">
    <div className="h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="inline-block w-8 h-8 bg-red-600 group-hover:bg-red-500 transition-colors" aria-hidden="true"></span>
              <span className="font-extrabold tracking-wider text-xl uppercase">GameGuides</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-wide">
              <Link to="/games" className="hover:text-red-500">Games</Link>
              <Link to="/" className="hover:text-red-500">Guides</Link>
              <Link to="/" className="hover:text-red-500">News</Link>
              <Link to="/" className="hover:text-red-500">Reviews</Link>
            </nav>
          </div>
        </div>
        <div className="h-1 bg-red-600"></div>
      </div>
    </header>
  )
}

export default Header