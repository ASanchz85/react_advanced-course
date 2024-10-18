import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../shared/components/avatar/Avatar'
import supabase from '../../../../shared/services/supabaseClient'
import type { ChatUser } from '../../../../shared/types/user'

interface RoomDetailsProps {
  userData: ChatUser
}

function RoomDetails({ userData }: RoomDetailsProps) {
  const navigate = useNavigate()

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log('Error logging out:', error.message)
      return
    }

    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session?.user?.email) {
      await supabase
        .from('online_users')
        .update({
          status: 'offline',
          last_seen: new Date().toISOString()
        })
        .eq('user_email', session.user.email)
    }

    navigate('/')
  }

  return (
    <header className='details__header'>
      <Avatar userMetadata={userData.user_metadata} />
      <span onClick={handleLogOut}>
        <FaArrowAltCircleLeft />
      </span>
    </header>
  )
}

export default RoomDetails
