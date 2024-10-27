import { NavLink } from 'react-router-dom'
import { FaPalette } from 'react-icons/fa'
import { IoHelpCircleSharp } from 'react-icons/io5'
import { PiChatsCircleFill } from 'react-icons/pi'
import { IoLogOut } from 'react-icons/io5'
import supabase from '../../../../shared/services/supabaseClient'
import './sidebar.css'

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

    // window.location.reload()
  }

  return (
    <div className='sidebar__links'>
      <div className='sidebar__icons'>
        <NavLink
          to='/global-chat'
          title='Chat rooms'
          className={({ isActive }) =>
            isActive || location.pathname.includes('chat') ? 'active' : ''
          }
        >
          <PiChatsCircleFill />
        </NavLink>
      </div>
      <div className='sidebar__help'>
        <NavLink
          to='/nter-help'
          title='NTER help'
        >
          <IoHelpCircleSharp />
        </NavLink>
        <NavLink
          to='/theme'
          title='Edit theme'
        >
          <FaPalette className='theme__icon' />
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
