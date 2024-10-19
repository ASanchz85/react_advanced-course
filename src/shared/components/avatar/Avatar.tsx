import { emailParser } from '../../utils/stringHandler'
import type { UserChatMetadata } from '../../types/user'
import './avatar.css'

function Avatar({ userMetadata }: { userMetadata: UserChatMetadata }) {
  return (
    <>
      {userMetadata && (
        <div className='avatar__container'>
          <div className='avatar__image__container'>
            <img
              src={userMetadata.avatar_url ?? '/profile_fallback.png'}
              alt={userMetadata.full_name}
              className='avatar__image'
              onError={(e) => {
                e.currentTarget.src = 'profile_fallback.png'
              }}
            />
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
