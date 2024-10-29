import { createContext, useContext, ReactNode } from 'react'
import { useToast } from './ToastContext'
import { useSession } from '../hooks/useSession'
import supabase from '../services/supabaseClient'
import { ERROR_HEADER, ERROR_MESSAGES, TOAST_TYPES } from '../config/constants'
import type { ChatUser } from '../types/user'
import type { Session } from '@supabase/supabase-js'

interface AuthContextType {
  session: Session | null
  userInfo: ChatUser | null
  activeUser: string
  loading: boolean
  handleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, userInfo, activeUser, loading } = useSession()
  const { addToast } = useToast()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      addToast({
        message: error.message || ERROR_MESSAGES.LOGOUT,
        type: TOAST_TYPES.ERROR
      })
      return
    }

    window.location.reload()
  }

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/global-chat`
        }
      })

      if (error) {
        throw new Error(error.message || ERROR_MESSAGES.LOGIN)
      }
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          message: `${ERROR_HEADER}: ${error.message}`,
          type: TOAST_TYPES.ERROR
        })
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        userInfo,
        activeUser,
        loading,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
