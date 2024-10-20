import { FaPalette } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { IoHelpCircleSharp } from 'react-icons/io5'
import { PiChatsCircleFill } from 'react-icons/pi'
import { IoLogOut } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import supabase from '../../../../shared/services/supabaseClient'

function Sidebar() {
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

    window.location.reload()
  }

  return (
    <div className='sidebar__links'>
      <div className='sidebar__icons'>
        <NavLink
          to='/'
          title='Chat rooms'
        >
          <PiChatsCircleFill />
        </NavLink>
        <NavLink
          to='/about'
          title='Edit theme'
        >
          <FaPalette />
        </NavLink>
        <NavLink
          to='/about'
          title='Edit profile'
        >
          <IoSettings />
        </NavLink>
      </div>
      <div className='sidebar__help'>
        <NavLink
          to='/about'
          title='NTER help'
        >
          <IoHelpCircleSharp />
        </NavLink>
        <NavLink
          to='/'
          title='Logout'
          onClick={handleLogOut}
        >
          <IoLogOut />
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
