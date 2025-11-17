import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://iqvfllvdrztrnxtauiro.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdmZsbHZkcnp0cm54dGF1aXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Nzc1NjgsImV4cCI6MjA3ODQ1MzU2OH0.tK1MN1ZVh8L1EsSuDftpqRjc1RgwpdWadATyJS3u8II'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions
export const getGames = async () => {
  const { data, error } = await supabase
    .from('app_d563a3af02_games')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getGameBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('app_d563a3af02_games')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export const getGuidesByGame = async (gameId) => {
  const { data, error } = await supabase
    .from('app_d563a3af02_guides')
    .select('*')
    .eq('game_id', gameId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getGuideBySlug = async (gameId, slug) => {
  const { data, error } = await supabase
    .from('app_d563a3af02_guides')
    .select('*, app_d563a3af02_games(*)')
    .eq('game_id', gameId)
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}
// Add these shrine helper functions to your existing supabase.js file

// Get all shrines
export const getShrines = async () => {
  const { data, error } = await supabase
    .from('shrines')
    .select('*')
    .order('id', { ascending: true })
  
  if (error) throw error
  return data
}

// Get shrines by region
export const getShrinesByRegion = async (region) => {
  const { data, error } = await supabase
    .from('shrines')
    .select('*')
    .eq('region', region)
    .order('id', { ascending: true })
  
  if (error) throw error
  return data
}

// Get a single shrine by id
export const getShrineById = async (id) => {
  const { data, error } = await supabase
    .from('shrines')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Toggle shrine completion status
export const toggleShrineDone = async (id, done) => {
  const { data, error } = await supabase
    .from('shrines')
    .update({ done })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Update shrine map link
export const updateShrineMapLink = async (id, mapLink) => {
  const { data, error } = await supabase
    .from('shrines')
    .update({ map_link: mapLink })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Get completion statistics
export const getShrineStats = async () => {
  const { data, error } = await supabase
    .from('shrines')
    .select('done, region')
  
  if (error) throw error
  
  const total = data.length
  const completed = data.filter(shrine => shrine.done).length
  const byRegion = data.reduce((acc, shrine) => {
    if (!acc[shrine.region]) {
      acc[shrine.region] = { total: 0, completed: 0 }
    }
    acc[shrine.region].total++
    if (shrine.done) acc[shrine.region].completed++
    return acc
  }, {})
  
  return {
    total,
    completed,
    percentage: ((completed / total) * 100).toFixed(1),
    byRegion
  }
}

// Additional helper function to get guide by slug with game info
export const getGuideBySlugWithGame = async (gameSlug, guideSlug) => {
  // First get the game by slug
  const game = await getGameBySlug(gameSlug)
  
  // Then get the guide by game_id and guide slug
  const { data, error } = await supabase
    .from('app_d563a3af02_guides')
    .select('*')
    .eq('game_id', game.id)
    .eq('slug', guideSlug)
    .single()
  
  if (error) throw error
  
  
  // Return guide with game info attached
  return {
    ...data,
    game: game
  }
}