import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AsideContentWrapper } from '../../../../theme/layout/components'
import { Avatar, SearchBar } from '../../../../shared/components'
import {
  findTitleViewByPath,
  isChatInPath
} from '../../../../shared/utils/pathHandler'
import { GLOBLAL_CHAT_USER_DETAILS } from '../../../../shared/config/constants'
import type { ChatUser } from '../../../../shared/types/user'
import './userList.css'

interface UserListProps {
  listOfLinks: string[]
  currentUser: ChatUser
}

function UserList({ listOfLinks, currentUser }: UserListProps) {
  const title = isChatInPath() ? 'Chats' : findTitleViewByPath()
  const [filteredUsers, setFilteredUsers] = useState(listOfLinks)

  const handleFilteredUsers = (query: string) => {
    if (query) {
      const result = listOfLinks.filter((email) =>
        email.toLowerCase().includes(query.toLowerCase()))
      setFilteredUsers(result)
    } else {
      setFilteredUsers(listOfLinks)
    }
  }

  useEffect(() => {
    setFilteredUsers(listOfLinks)
  }, [listOfLinks])

  return (
    <AsideContentWrapper title={title}>
      <SearchBar handleFilteredUsers={handleFilteredUsers} />
      <NavLink
        to={'/global-chat'}
        className='user__list-item'
      >
        <Avatar
          userMetadata={GLOBLAL_CHAT_USER_DETAILS}
          isGlobalChat
          isUserList
        />
      </NavLink>
      {filteredUsers
        .filter((email) => email !== currentUser.user_metadata.email)
        .map((element) => (
          <NavLink
            key={element}
            to={`/chat/${element}`}
            className='user__list-item'
          >
            <Avatar
              email={element}
              isUserList
            />
          </NavLink>
        ))}
    </AsideContentWrapper>
  )
}

export default UserList
