import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGames } from '../services/supabase'

const Games = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Games</h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {filteredGames.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No games found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <Link 
              key={game.id} 
              to={`/games/${game.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img 
                src={game.cover_image || 'https://via.placeholder.com/400x200?text=Game+Cover'} 
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {game.description || 'No description'}
                </p>
                {game.platforms && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {game.platforms.slice(0, 2).map(platform => (
                      <span 
                        key={platform}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Games