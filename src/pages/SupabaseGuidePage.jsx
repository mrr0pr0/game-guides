import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'

const SupabaseGuidePage = () => {
  const { guideSlug } = useParams()
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuide()
  }, [guideSlug])

  const fetchGuide = async () => {
    try {
      const { data: guideData } = await supabase
        .from('app_d563a3af02_guides')
        .select('*')
        .eq('slug', guideSlug)
        .eq('guide_type', 'Supabase')
        .single()

      setGuide(guideData)
    } catch (error) {
      console.error('Error fetching Supabase guide:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-medium">Loading Supabase guide...</p>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-black text-neutral-900 mb-4">Guide Not Found</h1>
        <p className="text-neutral-600 mb-8">The Supabase guide you're looking for doesn't exist.</p>
        <Link to="/games" className="ign-button">Browse All Games</Link>
      </div>
    )
  }

  return (
    <div className="container-page">
      <div className="mb-6">
        <Link
          to="/games"
          className="inline-flex items-center text-sm font-bold text-green-600 hover:text-green-700 uppercase tracking-wider"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Games
        </Link>
      </div>

      <main className="max-w-4xl mx-auto">
        <article className="article">
          <header className="article-header">
            <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Supabase Guide
            </span>
            <h1 className="article-title">{guide.title}</h1>
            <div className="article-meta">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {(guide.author || 'Staff')[0].toUpperCase()}
                </div>
                <span className="font-bold">By {guide.author || 'Staff'}</span>
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

        <div className="mt-8 p-6 bg-green-900 rounded-lg text-white">
          <h3 className="text-xl font-black mb-3">Learn More About Supabase</h3>
          <p className="text-green-100 mb-5">Explore more database and backend guides</p>
          <Link
            to="/games"
            className="inline-block px-6 py-3 bg-white text-green-900 rounded font-bold hover:bg-green-50 transition-colors"
          >
            Browse All Guides
          </Link>
        </div>
      </main>
    </div>
  )
}

export default SupabaseGuidePage
