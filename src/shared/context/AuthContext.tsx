import { createContext, useContext, ReactNode } from 'react'
import { useSession } from '../hooks/useSession'
import supabase from '../services/supabaseClient'
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message || 'Error logging out')
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
        throw new Error(error.message || 'Error logging in')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[ERROR]:', error.message)
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
