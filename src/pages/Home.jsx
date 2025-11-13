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
    <div className="container-page">
      {/* Hero */}
      <div className="relative mb-10">
        <div className="bg-zinc-900 text-white rounded-xl overflow-hidden">
          <div className="p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-red-500 font-semibold uppercase tracking-widest text-xs mb-2">Featured</div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Your hub for walkthroughs, boss guides, and secrets
              </h1>
              <p className="text-zinc-300 mb-6">Step-by-step guides across the biggest games. Built for quick scanning and deep dives, like you see on IGN.</p>
            </div>
            <div className="hidden md:block">
              <div className="aspect-video bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Popular */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Trending Guides</h2>
          <span className="text-sm text-zinc-500">Updated daily</span>
        </div>
        {games.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No games available yet. Add some in Supabase!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 3).map(game => (
              <Link 
                key={game.id} 
                to={`/games/${game.slug}`}
                className="group block rounded-xl overflow-hidden bg-black"
              >
                <div className="relative">
                  <img 
                    src={game.cover_image || 'https://via.placeholder.com/800x450?text=Game+Cover'} 
                    alt={game.title}
                    className="w-full aspect-video object-cover group-hover:opacity-95 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 p-4">
                    <div className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2 py-1">Guide</div>
                    <h3 className="mt-2 text-white text-xl font-extrabold drop-shadow">{game.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* All */}
      <section>
        <h2 className="text-2xl font-extrabold tracking-tight mb-6">All Guides</h2>
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
                    src={game.cover_image || 'https://via.placeholder.com/600x600?text=Game+Cover'} 
                    alt={game.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg pointer-events-none" />
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-red-600 transition-colors">
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