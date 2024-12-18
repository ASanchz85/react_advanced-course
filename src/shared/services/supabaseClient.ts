import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_API_SUPABASE_KEY as string

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
