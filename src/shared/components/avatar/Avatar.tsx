import { emailParser } from '../../utils/stringHandler'
import { IoPersonCircle } from 'react-icons/io5'
import type { UserChatMetadata } from '../../types/user'
import './avatar.css'

function Avatar({ userMetadata }: { userMetadata: UserChatMetadata }) {
  return (
    <>
      {userMetadata && (
        <div className='avatar__container'>
          <div className='avatar__image__container'>
            {userMetadata.avatar_url ? (
              <img
                src={userMetadata.avatar_url}
                alt={userMetadata.full_name}
                className='avatar__image'
              />
            ) : (
              <IoPersonCircle className='avatar__image' />
            )}
          </div>
          <div className='avatar__details'>
            <p>{emailParser(userMetadata.email)}</p>
            <p>online</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Avatar
