import { useState } from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import './login.css'

function Login() {
  const [onLoginOver, setOnLoginOver] = useState(false)
  const { handleLogin } = useAuth()

  return (
    <section className='login__container'>
      <img
        className={onLoginOver ? 'logo isHover' : 'logo'}
        src='/Nchat_logo.png'
        alt='company logo'
      />
      <button
        onClick={handleLogin}
        onMouseEnter={() => setOnLoginOver(true)}
        onMouseLeave={() => setOnLoginOver(false)}
      >
        Login
      </button>
    </section>
  )
}

export default Login
