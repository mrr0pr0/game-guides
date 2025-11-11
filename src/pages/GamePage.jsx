import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGameBySlug, getGuidesByGame } from '../services/supabase'

const GamePage = () => {
  const { slug } = useParams()
  const [game, setGame] = useState(null)
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGameData()
  }, [slug])

  const fetchGameData = async () => {
    try {
      const gameData = await getGameBySlug(slug)
      setGame(gameData)
      
      const guidesData = await getGuidesByGame(gameData.id)
      setGuides(guidesData)
    } catch (error) {
      console.error('Error fetching game:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  if (!game) {
    return <div className="text-center py-20 text-xl">Game not found</div>
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <img 
          src={game.cover_image || 'https://via.placeholder.com/1200x400?text=Game+Banner'} 
          alt={game.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
          <p className="text-gray-700 mb-4">{game.description}</p>
          
          {game.platforms && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Platforms:</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map(platform => (
                  <span 
                    key={platform}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Guides</h2>
        {guides.length === 0 ? (
          <p className="text-gray-600">No guides available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(guide => (
              <Link 
                key={guide.id}
                to={`/games/${slug}/guides/${guide.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{guide.title}</h3>
                  {guide.guide_type && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {guide.guide_type}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  By {guide.author || 'Anonymous'}
                </p>
                <p className="text-gray-700 line-clamp-2">
                  {guide.content.substring(0, 150)}...
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GamePage