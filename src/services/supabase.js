import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iqvfllvdrztrnxtauiro.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdmZsbHZkcnp0cm54dGF1aXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Nzc1NjgsImV4cCI6MjA3ODQ1MzU2OH0.tK1MN1ZVh8L1EsSuDftpqRjc1RgwpdWadATyJS3u8II'

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