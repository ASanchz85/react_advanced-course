import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import supabase from './shared/services/supabaseClient'
import mainRouting from './shared/routes/mainRouting'
import type { Session } from '@supabase/supabase-js'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data) {
      setSession(data.session)
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return <>{session ? <RouterProvider router={mainRouting} /> : <Login />}</>
}

export default App
