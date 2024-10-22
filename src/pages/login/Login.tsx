import { useState } from 'react'
import supabase from '../../shared/services/supabaseClient'
import { useSession } from '../../shared/hooks'
import getBase64FromImageUrl from '../../shared/helpers/getBase64FromImageUrl'
import { isNterEmail } from '../../shared/utils/emailHandler'
import {
  TABLE_MESSAGE_FIELDS,
  TABLE_SQL_NAMES
} from '../../shared/config/tableConstants'
import './login.css'

function Login() {
  const [onLoginOver, setOnLoginOver] = useState(false)
  // const { session } = useSession()

  // const storeUserDataWithAvatar = async (userId: string, avatarUrl: string) => {
  //   console.log('Storing user data:', userId, avatarUrl)
  //   const base64Image = await getBase64FromImageUrl(avatarUrl)
  //   console.log('base64Image:', base64Image)

  //   const { data, error } = await supabase
  //     .from(TABLE_SQL_NAMES.MESSAGES)
  //     .update({ avatar_image: base64Image })
  //     .eq(TABLE_MESSAGE_FIELDS.EMAIL_SENDER, userId)

  //   if (error) {
  //     console.error('Error storing user data:', error)
  //   } else {
  //     console.log('User data stored successfully:', data)
  //   }
  // }

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

      // if (data && session?.user) {
      //   const { error: upsertError } = await supabase
      //     .from('online_users')
      //     .upsert({
      //       id: session.user.id,
      //       user_email: session.user.email,
      //       status: 'online',
      //       last_seen: new Date().toISOString()
      //     })

      //   if (upsertError) {
      //     throw new Error(upsertError.message || 'Error registering log-in')
      //   }
      // }
    } catch (error) {
      if (error instanceof Error) {
        console.error('[ERROR]:', error.message)
      }
    }
  }

  // supabase.auth.onAuthStateChange(async (event, session) => {
  //   if (event === 'SIGNED_IN') {
  //     const user = session?.user
  //     console.log('User session:', user)
  //     console.log('path to image:', window.location.origin + '/NWorld_logo.png')
  //     if (user && user.email) {
  //       if (isNterEmail(user.email)) {
  //         await storeUserDataWithAvatar(
  //           user.email,
  //           window.location.origin + '/NWorld_logo.png'
  //         )
  //       }
  //       await storeUserDataWithAvatar(user.email, user.user_metadata.avatar_url)
  //     }
  //   }
  // })

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
