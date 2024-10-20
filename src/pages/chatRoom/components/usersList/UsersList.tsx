import { NavLink } from 'react-router-dom'
import type { ChatUser } from '../../../../shared/types/user'
import SearchBar from '../../../../shared/components/searchBar/SearchBar'

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
          Global Chat
        </NavLink>
        {allUsers
          .filter((email) => email !== currentUser.user_metadata.email)
          .map((email) => (
            <NavLink
              key={email}
              to={`${email}`}
              /* onClick={() => setSelectedUser(email)} */
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