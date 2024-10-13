import { FaArrowAltCircleLeft } from 'react-icons/fa'
import supabase from '../../../../shared/services/supabaseClient'
import Avatar from '../../../../shared/components/avatar/Avatar'
import type { ChatUser } from '../../../../pages/chatRoom/ChatRoom'

interface HeaderProps {
  userData: ChatUser
}

function Header({ userData }: HeaderProps) {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log('Error logging out:', error.message)
      return
    }
    window.location.reload()
  }

  return (
    <header
      className='header'
      style={{
        backgroundColor: 'lightgreen',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem'
      }}
    >
      <span
        onClick={handleLogOut}
        style={{ cursor: 'pointer' }}
      >
        <FaArrowAltCircleLeft style={{ height: '30px', width: '30px' }} />
      </span>
      <h1>N-Chat</h1>
      <Avatar userMetadata={userData.user_metadata} />
    </header>
  )
}

export default Header
