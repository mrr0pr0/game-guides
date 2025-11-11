import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions
export const getGames = async () => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getGameBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export const getGuidesByGame = async (gameId) => {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('game_id', gameId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getGuideBySlug = async (gameId, slug) => {
  const { data, error } = await supabase
    .from('guides')
    .select('*, games(*)')
    .eq('game_id', gameId)
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}