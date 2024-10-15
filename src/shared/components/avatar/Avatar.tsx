interface AvatarProps {
  userMetadata: {
    avatar_url: string
    full_name: string
    email: string
  }
}

function Avatar({ userMetadata }: AvatarProps) {
  return (
    <div
      className='avatar'
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {userMetadata && (
        <div>
          <img
            src={userMetadata.avatar_url}
            alt={userMetadata.full_name}
            className='avatar__image'
            onError={(e) => {
              e.currentTarget.src = 'profile_fallback.png'
            }}
            style={{ width: '75px', height: '75px', borderRadius: '50%' }}
          />
          <p
            className='avatar__name'
            style={{ textAlign: 'center' }}
          >
            {userMetadata.full_name}
          </p>
        </div>
      )}
    </div>
  )
}

export default Avatar
