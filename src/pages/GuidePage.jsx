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

      setGuide({ ...guideData, game: gameData })
      setAllGuides(guidesData || [])
    } catch (error) {
      console.error('Error fetching guide:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  if (!guide) {
    return <div className="text-center py-20 text-xl">Guide not found</div>
  }

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <Link 
              to={`/games/${guide.game.slug}`}
              className="text-blue-600 hover:underline text-sm mb-4 block"
            >
              ← Back to {guide.game.title}
            </Link>
            <h3 className="font-bold text-sm mb-3 text-gray-700 uppercase">Table of Contents</h3>
            <ul className="space-y-2">
              {allGuides.map(g => (
                <li key={g.id}>
                  <Link
                    to={`/games/${slug}/guides/${g.slug}`}
                    className={`text-sm block px-2 py-1 rounded ${
                      g.slug === guideSlug
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <article className="bg-white border border-gray-200 rounded-lg p-8">
          <header className="mb-8 pb-6 border-b">
            <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>By {guide.author || 'Anonymous'}</span>
              {guide.guide_type && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded capitalize">
                  {guide.guide_type}
                </span>
              )}
              <span>Updated {new Date(guide.updated_at || guide.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {guide.content.split('\n\n').map((section, index) => {
              if (section.trim().endsWith(':')) {
                return (
                  <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                    {section}
                  </h2>
                )
              }
              const lines = section.split('\n')
              if (lines.some(line => line.match(/^\d+\./))) {
                return (
                  <ol key={index} className="list-decimal list-inside mb-4 space-y-2">
                    {lines.map((line, i) => (
                      <li key={i} className="text-gray-800 leading-relaxed">
                        {line.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                )
              }
              return (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {section}
                </p>
              )
            })}
          </div>
        </article>

        <div className="mt-6">
          <Link 
            to={`/games/${guide.game.slug}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            View All {guide.game.title} Guides
          </Link>
        </div>
      </main>
    </div>
  )
}

export default GuidePage