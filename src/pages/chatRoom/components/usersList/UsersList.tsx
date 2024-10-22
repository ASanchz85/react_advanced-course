import { NavLink } from 'react-router-dom'
import { Avatar, SearchBar } from '../../../../shared/components'
import { GLOBLAL_CHAT_USER_DETAILS } from '../../../../shared/config/constants'
import type { ChatUser } from '../../../../shared/types/user'
import './userList.css'

interface UsersListProps {
  allUsers: string[]
  currentUser: ChatUser
}

function UsersList({ allUsers, currentUser }: UsersListProps) {
  return (
    <section className='users__container'>
      <div className='users__title'>
        <h2>Chats</h2>
      </div>
      <div className='users__list'>
        <SearchBar />
        <NavLink
          to={'/global-chat'}
          className='users__list-item'
        >
          <Avatar
            userMetadata={GLOBLAL_CHAT_USER_DETAILS}
            isGlobalChat
            isUserList
          />
        </NavLink>
        {allUsers
          .filter((email) => email !== currentUser.user_metadata.email)
          .map((email) => (
            <NavLink
              key={email}
              to={`/chat/${email}`}
              className='users__list-item'
            >
              {email}
            </NavLink>
          ))}
      </div>
    </section>
  )
}

export default UsersList
