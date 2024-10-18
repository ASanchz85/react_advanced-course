import { useState } from 'react'
import supabase from '../../shared/services/supabaseClient'
import { useSession } from '../../shared/hooks'
import './login.css'

function Login() {
  const [onLoginOver, setOnLoginOver] = useState(false)
  const { session } = useSession()

  const handleLogIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/global-chat`
        }
      })

      if (error) {
        throw new Error(error.message || 'Error logging in')
      }

      if (data && session?.user) {
        const { error: upsertError } = await supabase
          .from('online_users')
          .upsert({
            id: session.user.id,
            user_email: session.user.email,
            status: 'online',
            last_seen: new Date().toISOString()
          })

        if (upsertError) {
          throw new Error(upsertError.message || 'Error registering log-in')
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[ERROR]:', error.message)
      }
    }
  }

  return (
    <section className='login__container'>
      <img
        className={onLoginOver ? 'logo isHover' : 'logo'}
        src='/Nchat_logo.png'
        alt='company logo'
      />
      <button
        onClick={handleLogIn}
        onMouseEnter={() => setOnLoginOver(true)}
        onMouseLeave={() => setOnLoginOver(false)}
      >
        Login
      </button>
    </section>
  )
}

export default Login
