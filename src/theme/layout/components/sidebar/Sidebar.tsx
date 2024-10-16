import { FaPalette } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'

function Sidebar() {
  return (
    <>
      <div className='sidebar__links'>
        <a href='/'>
          <FaPalette />
        </a>
        <a href='/about'>
          <IoLogOut />
        </a>
      </div>
      <div className='sidebar__logo'>
        <img
          src='/Nchat_logo.png'
          alt='chat logo'
        />
      </div>
    </>
  )
}

export default Sidebar
