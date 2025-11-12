import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGames } from '../services/supabase'

const Games = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const data = await getGames()
      setGames(data)
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredGames = games
    .filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === 'za') {
        return b.title.localeCompare(a.title)
      }
      return 0
    })

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Guides</h1>
        
        <div className="flex gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Most Popular</option>
            <option value="az">Alphabetical - A to Z</option>
            <option value="za">Alphabetical - Z to A</option>
          </select>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No games found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <Link 
              key={game.id} 
              to={`/games/${game.slug}`}
              className="block group"
            >
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img 
                  src={game.cover_image || 'https://via.placeholder.com/400x400?text=Game+Cover'} 
                  alt={game.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">
                {game.title} Guide
              </h3>
              <p className="text-xs text-gray-500">
                {game.platforms ? game.platforms.slice(0, 2).join(', ') : 'Multi-platform'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Games