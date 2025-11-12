import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGames } from '../services/supabase'

const Home = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Guides</h1>
        <p className="text-xl text-gray-600">Guides, Step-by-Step Walkthroughs, Cheats, FAQs and more</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular in guides</h2>
        {games.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No games available yet. Add some in Supabase!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 3).map(game => (
              <Link 
                key={game.id} 
                to={`/games/${game.slug}`}
                className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={game.cover_image || 'https://via.placeholder.com/400x200?text=Game+Cover'} 
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{game.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{game.description || 'No description available'}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {game.platforms && game.platforms.slice(0, 2).map(platform => (
                      <span key={platform}>{platform}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">All Guides</h2>
        {games.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No games available yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map(game => (
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
                  {game.title}
                </h3>
                <p className="text-xs text-gray-500">Guide</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home