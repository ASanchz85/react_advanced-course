import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import type { Session } from '@supabase/supabase-js'
import type { ChatUser } from '../types/user'

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [userInfo, setUserInfo] = useState<ChatUser | null>(null)
  const [activeUser, setActiveUser] = useState('')

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        throw error
      }

      if (data) {
        setSession(data.session)
      }

      if (data?.session?.user?.user_metadata) {
        const { avatar_url, full_name, email } = data.session.user.user_metadata
        setUserInfo({ user_metadata: { avatar_url, full_name, email } })
      }

      if (data?.session?.user?.email) {
        setActiveUser(data.session.user.email)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching messages:', error.message)
      }
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return { session, userInfo, activeUser }
}
