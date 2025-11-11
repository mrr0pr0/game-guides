import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'

const GuidePage = () => {
  const { slug, guideSlug } = useParams()
  const [guide, setGuide] = useState(null)
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

      setGuide({ ...guideData, game: gameData })
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link 
          to={`/games/${guide.game.slug}`}
          className="text-blue-600 hover:underline"
        >
          ← Back to {guide.game.title}
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md p-8">
        <header className="mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>By {guide.author || 'Anonymous'}</span>
            {guide.guide_type && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {guide.guide_type}
              </span>
            )}
            <span>{new Date(guide.created_at).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {guide.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}

export default GuidePage