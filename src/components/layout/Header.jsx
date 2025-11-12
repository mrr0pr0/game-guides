import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
            GameGuides
          </Link>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  All Games
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header