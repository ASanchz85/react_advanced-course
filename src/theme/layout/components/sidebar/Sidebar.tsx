import { FaPalette } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { IoHelpCircleSharp } from 'react-icons/io5'
import { PiChatsCircleFill } from 'react-icons/pi'
import { IoLogOut } from 'react-icons/io5'

function Sidebar() {
  return (
    <div className='sidebar__links'>
      <a href='/'>
        <PiChatsCircleFill />
      </a>
      <a href='/about'>
        <FaPalette />
      </a>
      <a href='/about'>
      </a>
      <a href='/about'>
        <IoHelpCircleSharp />
      </a>
      <a href='/about'>
        <IoSettings />
      </a>
      <a href='/about'>
        <IoLogOut />
      </a>
    </div>
  )
}

export default Sidebar
