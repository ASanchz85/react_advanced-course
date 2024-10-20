import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { IoCall, IoVideocam } from 'react-icons/io5'
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
  }

  return (
    <header className='details__header'>
      <div className='active_user__content'>
        <Avatar userMetadata={userData.user_metadata} />
        <div className='icons__container'>
          <span className='icons_item'>
            <IoCall />
          </span>
          <span className='icons_item'>
            <IoVideocam />
          </span>
          <span className='icons_item'>
            <PiDotsThreeOutlineVerticalFill />
          </span>
        </div>
      </div>
    </header>
  )
}

export default RoomDetails
