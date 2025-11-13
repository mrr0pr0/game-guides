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
      <div className="relative mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative h-[500px] bg-gradient-to-b from-black to-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          {games.length > 0 && games[0].cover_image && (
            <img
              src={games[0].cover_image}
              alt="Featured"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          <div className="relative z-20 h-full flex items-center">
            <div className="container-page w-full">
              <div className="max-w-2xl">
                <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 mb-4">Featured Guide</span>
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                  Master Every Game with Expert Guides
                </h1>
                <p className="text-xl text-neutral-300 mb-8 leading-relaxed">Comprehensive walkthroughs, hidden collectibles, and pro tips for the biggest games.</p>
                <Link to="/games" className="ign-button">
                  Browse All Guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-neutral-900 mb-1">Trending Guides</h2>
            <p className="text-sm text-neutral-500">Updated daily with the latest strategies</p>
          </div>
          <Link to="/games" className="text-sm font-bold text-red-600 hover:text-red-700 uppercase tracking-wider">
            View All →
          </Link>
        </div>
        {games.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <p className="text-neutral-600">No games available yet. Add some in Supabase!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.slice(0, 3).map(game => (
              <Link
                key={game.id}
                to={`/games/${game.slug}`}
                className="game-card group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={game.cover_image || 'https://via.placeholder.com/800x450?text=Game+Cover'}
                    alt={game.title}
                    className="game-card-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="ign-badge">Walkthrough</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-black drop-shadow-lg">{game.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-neutral-600 line-clamp-2">{game.description || 'Complete guide with tips, secrets, and walkthroughs.'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-black text-neutral-900 mb-1">All Game Guides</h2>
          <p className="text-sm text-neutral-500">Browse our complete collection</p>
        </div>
        {games.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <p className="text-neutral-600">No games available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {games.map(game => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                      {game.title}
                    </h3>
                    <p className="text-xs text-neutral-300">{game.platforms ? game.platforms.slice(0, 2).join(', ') : 'Multi-platform'}</p>
                  </div>
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