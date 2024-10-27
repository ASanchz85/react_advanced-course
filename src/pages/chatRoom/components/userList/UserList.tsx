import { NavLink } from 'react-router-dom'
import { AsideContentWrapper } from '../../../../theme/layout/components'
import { Avatar, SearchBar } from '../../../../shared/components'
import {
  findTitleViewByPath,
  isChatInPath
} from '../../../../shared/utils/pathHandler'
import { emailParser } from '../../../../shared/utils/emailHandler'
import { GLOBLAL_CHAT_USER_DETAILS } from '../../../../shared/config/constants'
import type { ChatUser } from '../../../../shared/types/user'
import './userList.css'

interface UserListProps {
  listOfLinks: string[]
  currentUser: ChatUser
}

function UserList({ listOfLinks, currentUser }: UserListProps) {
  const title = isChatInPath() ? 'Chats' : findTitleViewByPath()

  return (
    <AsideContentWrapper title={title}>
      <SearchBar />
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
      {listOfLinks
        .filter((email) => email !== currentUser.user_metadata.email)
        .map((element) => (
          <NavLink
            key={element}
            to={`/chat/${element}`}
            className='user__list-item'
          >
            {emailParser(element)}
          </NavLink>
        ))}
    </AsideContentWrapper>
  )
}

export default UserList
