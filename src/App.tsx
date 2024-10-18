import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import mainRouting from './shared/routes/mainRouting'
import { useSession } from './shared/hooks'
import supabase from './shared/services/supabaseClient'

function App() {
  const { session } = useSession()

  const handleUserTracking = async () => {
    if (session?.user?.email) {
      await supabase
        .from('online_users')
        .update({
          status: 'offline',
          last_seen: new Date().toISOString()
        })
        .eq('user_email', session.user.email)
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleUserTracking)

    return () => {
      window.removeEventListener('beforeunload', handleUserTracking)
    }
  }, [])

  return <>{session ? <RouterProvider router={mainRouting} /> : <Login />}</>
}

export default App
