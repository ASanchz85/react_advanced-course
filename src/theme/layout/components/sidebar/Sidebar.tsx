import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../../shared/context/AuthContext'
import { FaPalette } from 'react-icons/fa'
import { IoHelpCircleSharp } from 'react-icons/io5'
import { PiChatsCircleFill } from 'react-icons/pi'
import { IoLogOut } from 'react-icons/io5'
import './sidebar.css'

function Sidebar() {
  const { handleLogout } = useAuth()

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
          onClick={handleLogout}
        >
          <IoLogOut />
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
