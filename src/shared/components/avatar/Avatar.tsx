import { IoPersonCircle } from 'react-icons/io5'
import { emailParser } from '../../utils/emailHandler'
import type { UserChatMetadata } from '../../types/user'
import './avatar.css'

interface AvatarProps {
  userMetadata: UserChatMetadata
  userLastMessage?: string
  isGlobalChat?: boolean
  isUserList?: boolean
}

function Avatar({
  userMetadata,
  userLastMessage = 'online',
  isGlobalChat = false,
  isUserList = false
}: AvatarProps) {
  return (
    <>
      {userMetadata && (
        <div
          className={`avatar__container ${isUserList && 'container__userList'}`}
        >
          <div
            className={`avatar__image__container ${
              isUserList && 'image__container__userList'
            }`}
          >
            {userMetadata.avatar_url ? (
              <img
                src={userMetadata.avatar_url}
                alt={userMetadata.full_name}
                className={`avatar__image ${isUserList && 'avatar__userList'}`}
                // onError={(e) => {
                //   e.currentTarget.src = 'https://i.imgur.com'
                // }}
              />
            ) : (
              <IoPersonCircle
                className={`avatar__image ${isUserList && 'avatar__userList'}`}
              />
            )}
          </div>
          <div
            className={`avatar__details ${
              isUserList && 'avatar_details__userList'
            }`}
          >
            <p>
              {isGlobalChat ? 'Global Chat' : emailParser(userMetadata.email)}
            </p>
            <p>{isGlobalChat ? '' : userLastMessage}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Avatar
