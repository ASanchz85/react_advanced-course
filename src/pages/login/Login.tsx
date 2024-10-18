import { useState } from 'react'
import supabase from '../../shared/services/supabaseClient'
import './login.css'

function Login() {
  const [onLoginOver, setOnLoginOver] = useState(false)

  const handleLogIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/global-chat`
        }
      })

      console.log('handleLogIn:', data)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging in:', error.message)
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
