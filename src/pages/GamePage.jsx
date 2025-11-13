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
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-black text-neutral-900 mb-4">Game Not Found</h1>
        <p className="text-neutral-600 mb-8">The game you're looking for doesn't exist.</p>
        <Link to="/games" className="ign-button">Browse All Games</Link>
      </div>
    )
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
    <div>
      <div className="relative h-80 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 bg-gradient-to-b from-black to-neutral-900">
        <div className="absolute inset-0">
          <img
            src={game.cover_image || 'https://via.placeholder.com/1200x400?text=Game+Banner'}
            alt={game.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end">
          <div className="container-page w-full pb-8">
            <span className="ign-badge mb-3">Complete Guide</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{game.title} Wiki Guide</h1>
            <p className="text-lg text-neutral-300 max-w-3xl">{game.description}</p>
          </div>
        </div>
      </div>

      <div className="container-page">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20">
              <div className="sidebar-card mb-5">
                <h3 className="font-black text-sm mb-4 text-neutral-900 uppercase tracking-wider">Game Info</h3>
                <div className="space-y-3 text-sm">
                  {game.release_date && (
                    <div>
                      <div className="font-bold text-neutral-700">Release Date</div>
                      <div className="text-neutral-600">{new Date(game.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  )}
                  {game.platforms && (
                    <div>
                      <div className="font-bold text-neutral-700">Platforms</div>
                      <div className="text-neutral-600">{game.platforms.join(', ')}</div>
                    </div>
                  )}
                  {game.developer && (
                    <div>
                      <div className="font-bold text-neutral-700">Developer</div>
                      <div className="text-neutral-600">{game.developer}</div>
                    </div>
                  )}
                  {game.publisher && (
                    <div>
                      <div className="font-bold text-neutral-700">Publisher</div>
                      <div className="text-neutral-600">{game.publisher}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="sidebar-card">
                <h3 className="font-black text-sm mb-4 text-neutral-900 uppercase tracking-wider">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`text-sm w-full text-left px-3 py-2 rounded font-medium transition-colors ${
                        activeCategory === 'all'
                          ? 'bg-red-600 text-white'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      All Guides <span className="float-right">({guides.length})</span>
                    </button>
                  </li>
                  {guideTypes.map(type => (
                    <li key={type}>
                      <button
                        onClick={() => setActiveCategory(type)}
                        className={`text-sm w-full text-left px-3 py-2 rounded font-medium capitalize transition-colors ${
                          activeCategory === type
                            ? 'bg-red-600 text-white'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        {type} <span className="float-right">({guides.filter(g => g.guide_type === type).length})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-neutral-900 mb-1">Walkthrough and Guides</h2>
              <p className="text-neutral-600">Everything you need to master {game.title}</p>
            </div>

            {filteredGuides.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <p className="text-neutral-600">No guides available yet for this category.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {Object.entries(categorizedGuides).map(([category, categoryGuides]) => (
                  <section key={category}>
                    <h3 className="text-2xl font-black text-neutral-900 capitalize mb-5 pb-2 border-b-2 border-red-600">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {categoryGuides.map(guide => (
                        <Link
                          key={guide.id}
                          to={`/games/${slug}/guides/${guide.slug}`}
                          className="game-card group"
                        >
                          <div className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-bold text-lg text-neutral-900 group-hover:text-red-600 transition-colors flex-1">
                                {guide.title}
                              </h4>
                              <svg className="w-5 h-5 text-neutral-400 group-hover:text-red-600 transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <p className="text-sm text-neutral-600 line-clamp-3 mb-3 leading-relaxed">
                              {guide.content.substring(0, 150)}...
                            </p>
                            <div className="flex items-center gap-3 text-xs text-neutral-500">
                              <span>By {guide.author || 'IGN Staff'}</span>
                              <span>•</span>
                              <span>{new Date(guide.updated_at || guide.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default GamePage
