import { useEffect, useState } from 'react'
import { useToast } from '../context/ToastContext'
import supabase from '../services/supabaseClient'
import { ERROR_HEADER, ERROR_MESSAGES, TOAST_TYPES } from '../config/constants'
import type { Session } from '@supabase/supabase-js'
import type { ChatUser } from '../types/user'

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [userInfo, setUserInfo] = useState<ChatUser | null>(null)
  const [activeUser, setActiveUser] = useState('')
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        throw new Error(error.message || ERROR_MESSAGES.SESSION)
      }

      if (data) {
        setSession(data.session)
      }

      if (!data.session || !data.session.user) {
        throw new Error(ERROR_MESSAGES.AUTH)
      }

      const { avatar_url, full_name, email } = data.session.user.user_metadata
      setUserInfo({ user_metadata: { avatar_url, full_name, email } })
      setActiveUser(email)
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          message: `${ERROR_HEADER}: ${error.message}`,
          type: TOAST_TYPES.ERROR
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return { session, userInfo, activeUser, loading }
}
