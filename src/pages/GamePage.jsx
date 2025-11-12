import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGameBySlug, getGuidesByGame } from '../services/supabase'

const GamePage = () => {
  const { slug } = useParams()
  const [game, setGame] = useState(null)
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

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

  const guideTypes = [...new Set(guides.map(g => g.guide_type).filter(Boolean))]
  const filteredGuides = activeCategory === 'all' 
    ? guides 
    : guides.filter(g => g.guide_type === activeCategory)

  const categorizeGuides = (guideList) => {
    const categories = {}
    guideList.forEach(guide => {
      const type = guide.guide_type || 'General'
      if (!categories[type]) {
        categories[type] = []
      }
      categories[type].push(guide)
    })
    return categories
  }

  const categorizedGuides = categorizeGuides(filteredGuides)

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-sm mb-3 text-gray-700 uppercase">Guide Categories</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`text-sm w-full text-left px-2 py-1 rounded ${
                    activeCategory === 'all' 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Guides ({guides.length})
                </button>
              </li>
              {guideTypes.map(type => (
                <li key={type}>
                  <button
                    onClick={() => setActiveCategory(type)}
                    className={`text-sm w-full text-left px-2 py-1 rounded capitalize ${
                      activeCategory === type 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type} ({guides.filter(g => g.guide_type === type).length})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className="relative h-48">
            <img 
              src={game.cover_image || 'https://via.placeholder.com/1200x400?text=Game+Banner'} 
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{game.title} Guide</h1>
            <p className="text-gray-700 mb-4">{game.description}</p>
            
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {game.release_date && (
                  <div>
                    <span className="font-semibold">Released</span>
                    <p className="text-gray-600">{new Date(game.release_date).toLocaleDateString()}</p>
                  </div>
                )}
                {game.platforms && (
                  <div>
                    <span className="font-semibold">Platforms</span>
                    <p className="text-gray-600">{game.platforms.join(', ')}</p>
                  </div>
                )}
                {game.developer && (
                  <div>
                    <span className="font-semibold">Developer</span>
                    <p className="text-gray-600">{game.developer}</p>
                  </div>
                )}
                {game.publisher && (
                  <div>
                    <span className="font-semibold">Publisher</span>
                    <p className="text-gray-600">{game.publisher}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">{game.title} Walkthrough and Guides</h2>
          {filteredGuides.length === 0 ? (
            <p className="text-gray-600">No guides available yet.</p>
          ) : (
            <div className="space-y-8">
              {Object.entries(categorizedGuides).map(([category, categoryGuides]) => (
                <section key={category}>
                  <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryGuides.map(guide => (
                      <Link 
                        key={guide.id}
                        to={`/games/${slug}/guides/${guide.slug}`}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold mb-2 text-blue-600 hover:text-blue-800">
                          {guide.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {guide.content.substring(0, 120)}...
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          By {guide.author || 'Anonymous'}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default GamePage