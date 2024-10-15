import { FaArrowAltCircleLeft } from 'react-icons/fa'
import Avatar from '../../../../shared/components/avatar/Avatar'
import supabase from '../../../../shared/services/supabaseClient'
import type { ChatUser } from '../../../../shared/types/user'

interface RoomDetailsProps {
  userData: ChatUser
}

function RoomDetails({ userData }: RoomDetailsProps) {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log('Error logging out:', error.message)
      return
    }
    window.location.reload()
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
