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
      setGames(data.slice(0, 6))
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
    <div>
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-12 shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to GameGuides</h1>
        <p className="text-xl mb-8">Your ultimate source for game walkthroughs and tips</p>
        <Link 
          to="/games" 
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
        >
          Browse All Games
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Games</h2>
        {games.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No games available yet. Add some in Supabase!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
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
                    {game.description || 'No description available'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home