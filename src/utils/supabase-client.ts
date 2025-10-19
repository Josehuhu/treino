import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './supabase/info'

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  if (!supabaseInstance) {
    if (!projectId || !publicAnonKey) {
      throw new Error(
        'Missing Supabase environment variables: NEXT_PUBLIC_PROJECT_ID and NEXT_PUBLIC_ANON_KEY must be set.'
      )
    }

    // Narrowed to string after runtime check
    supabaseInstance = createSupabaseClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    )
  }
  return supabaseInstance
}