import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'

const GuidePage = () => {
  const { slug, guideSlug } = useParams()
  const [guide, setGuide] = useState(null)
  const [allGuides, setAllGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuide()
  }, [slug, guideSlug])

  const fetchGuide = async () => {
    try {
      const { data: gameData } = await supabase
        .from('games')
        .select('id, title, slug')
        .eq('slug', slug)
        .single()

      const { data: guideData } = await supabase
        .from('guides')
        .select('*')
        .eq('game_id', gameData.id)
        .eq('slug', guideSlug)
        .single()

      const { data: guidesData } = await supabase
        .from('guides')
        .select('id, title, slug, guide_type')
        .eq('game_id', gameData.id)
        .order('guide_type', { ascending: true })

      setGuide({ ...guideData, game: gameData })
      setAllGuides(guidesData || [])
    } catch (error) {
      console.error('Error fetching guide:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading guide...</p>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-black text-neutral-900 mb-4">Guide Not Found</h1>
        <p className="text-neutral-600 mb-8">The guide you're looking for doesn't exist.</p>
        <Link to="/games" className="ign-button">Browse All Games</Link>
      </div>
    )
  }

  const groupedGuides = allGuides.reduce((acc, g) => {
    const type = g.guide_type || 'General'
    if (!acc[type]) acc[type] = []
    acc[type].push(g)
    return acc
  }, {})

  return (
    <div className="container-page">
      <div className="mb-6">
        <Link
          to={`/games/${guide.game.slug}`}
          className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {guide.game.title}
        </Link>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-20">
            <div className="sidebar-card">
              <h3 className="font-black text-sm mb-4 text-neutral-900 uppercase tracking-wider">Table of Contents</h3>
              <div className="space-y-4">
                {Object.entries(groupedGuides).map(([type, typeGuides]) => (
                  <div key={type}>
                    <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">{type}</div>
                    <ul className="space-y-1">
                      {typeGuides.map(g => (
                        <li key={g.id}>
                          <Link
                            to={`/games/${slug}/guides/${g.slug}`}
                            className={`text-sm block px-3 py-2 rounded font-medium transition-colors ${
                              g.slug === guideSlug
                                ? 'bg-red-600 text-white'
                                : 'text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {g.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <article className="article">
            <header className="article-header">
              {guide.guide_type && (
                <span className="ign-badge mb-4">{guide.guide_type}</span>
              )}
              <h1 className="article-title">{guide.title}</h1>
              <div className="article-meta">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {(guide.author || 'IGN')[0].toUpperCase()}
                  </div>
                  <span className="font-bold">By {guide.author || 'IGN Staff'}</span>
                </div>
                <span>•</span>
                <span>Updated {new Date(guide.updated_at || guide.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
                <span>•</span>
                <span>{Math.ceil(guide.content.split(' ').length / 200)} min read</span>
              </div>
            </header>

            <div className="article-content">
              {guide.content.split('\n\n').map((section, index) => {
                if (section.trim().endsWith(':')) {
                  return (
                    <h2 key={index}>
                      {section}
                    </h2>
                  )
                }

                const lines = section.split('\n')
                if (lines.some(line => line.match(/^\d+\./))) {
                  return (
                    <ol key={index}>
                      {lines.map((line, i) => {
                        const match = line.match(/^\d+\.\s*(.*)/)
                        if (match) {
                          return <li key={i}>{match[1]}</li>
                        }
                        return null
                      })}
                    </ol>
                  )
                }

                if (section.trim()) {
                  return <p key={index}>{section}</p>
                }

                return null
              })}
            </div>
          </article>

          <div className="mt-8 p-6 bg-neutral-900 rounded-lg text-white">
            <h3 className="text-xl font-black mb-3">Need More Help?</h3>
            <p className="text-neutral-300 mb-5">Check out our other guides for {guide.game.title}</p>
            <Link
              to={`/games/${guide.game.slug}`}
              className="ign-button"
            >
              View All {guide.game.title} Guides
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GuidePage
