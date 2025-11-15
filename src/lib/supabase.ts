import { createClient } from '@supabase/supabase-js'

// Garantir que as variáveis existam apenas no runtime (não durante build)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criar cliente apenas se as variáveis estiverem disponíveis
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
