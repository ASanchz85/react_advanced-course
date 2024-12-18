import { Avatar } from '../../../../shared/components'
import { Header } from '../../../../theme/layout/components'
import { IoCall, IoVideocam } from 'react-icons/io5'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { isNterEmail } from '../../../../shared/utils/emailHandler'
import { IMAGES } from '../../../../shared/config/constants'
import type { ChatUser } from '../../../../shared/types/user'
import './roomDetails.css'

interface RoomDetailsProps {
  userData: ChatUser
}

function RoomDetails({ userData }: RoomDetailsProps) {
  if (
    !userData.user_metadata.avatar_url &&
    isNterEmail(userData.user_metadata.email)
  ) {
    userData.user_metadata.avatar_url = IMAGES.NWORLD
  }

  return (
    <Header>
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
    </Header>
  )
}

export default RoomDetails
