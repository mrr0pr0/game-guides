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
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-2">All Game Guides</h1>
        <p className="text-neutral-600 mb-8">Comprehensive walkthroughs and strategies for your favorite games</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for a game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-red-500 bg-white text-neutral-900 font-medium"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-red-500 bg-white font-medium text-neutral-700"
          >
            <option value="popular">Most Popular</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm">
          <p className="text-neutral-600">No games found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredGames.map(game => (
            <Link
              key={game.id}
              to={`/games/${game.slug}`}
              className="game-card group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <img
                  src={game.cover_image || 'https://via.placeholder.com/400x533?text=Game+Cover'}
                  alt={game.title}
                  className="game-card-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg line-clamp-2">
                    {game.title}
                  </h3>
                  <p className="text-xs text-neutral-300">
                    {game.platforms ? game.platforms.slice(0, 2).join(', ') : 'Multi-platform'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Games