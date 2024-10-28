import { useState } from 'react'
import { IoPersonSharp } from 'react-icons/io5'
import { emailParser } from '../../utils/emailHandler'
import { getFirstTwoLetters } from '../../utils/stringHandler'
import type { UserChatMetadata } from '../../types/user'
import './avatar.css'

interface AvatarProps {
  userMetadata?: UserChatMetadata
  email?: string
  userLastMessage?: string
  isGlobalChat?: boolean
  isUserList?: boolean
}

function Avatar({
  userMetadata,
  email = '',
  userLastMessage = 'online',
  isGlobalChat = false,
  isUserList = false
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`avatar__container ${isUserList && 'container__userList'}`}>
      <div
        className={`avatar__image__container ${
          isUserList && 'image__container__userList'
        }`}
      >
        {userMetadata?.avatar_url && !imgError ? (
          <img
            src={userMetadata.avatar_url}
            alt={userMetadata.full_name}
            className={`avatar__image ${isUserList && 'avatar__userList'}`}
            onError={() => setImgError(true)}
          />
        ) : email ? (
          <div
            className={`avatar__initials__image ${
              isUserList && 'avatar__userList'
            }`}
          >
            <p>{getFirstTwoLetters(email)}</p>
          </div>
        ) : (
          <IoPersonSharp
            className={`avatar__image ${isUserList && 'avatar__userList'}`}
          />
        )}
      </div>
      <div
        className={`avatar__details ${
          isUserList && 'avatar_details__userList'
        }`}
      >
        {(userMetadata || email) && (
          <p>
            {isGlobalChat
              ? 'Global Chat'
              : emailParser(userMetadata?.email || email)}
          </p>
        )}
        {!email && <p>{isGlobalChat ? '' : userLastMessage}</p>}
      </div>
    </div>
  )
}

export default Avatar
