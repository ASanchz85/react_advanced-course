import { useState } from 'react'
import supabase from '../../shared/services/supabaseClient'
import './login.css'

function Login() {
  const [onLoginOver, setOnLoginOver] = useState(false)

  const handleLogIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })

    console.log(data, error)
  }

  return (
    <section
      className='login__container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
        height: '100vh',
        gap: '3rem'
      }}
    >
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
