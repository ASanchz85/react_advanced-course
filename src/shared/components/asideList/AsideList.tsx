import { NavLink } from 'react-router-dom'
import { Avatar, SearchBar } from '..'
import { findTitleViewByPath, isChatInPath } from '../../utils/pathHandler'
import { GLOBLAL_CHAT_USER_DETAILS } from '../../config/constants'
import type { ChatUser } from '../../types/user'
import './asideList.css'

interface AsideListProps {
  listOfLinks: string[]
  currentUser: ChatUser
}

function AsideList({ listOfLinks, currentUser }: AsideListProps) {
  const title = isChatInPath() ? 'Chats' : findTitleViewByPath()

  return (
    <aside className='aside__container'>
      <div className='aside__title'>
        <h2>{title}</h2>
      </div>
      <div className='aside__list'>
        {isChatInPath() && <SearchBar />}
        {isChatInPath() && (
          <NavLink
            to={'/global-chat'}
            className='aside__list-item'
          >
            <Avatar
              userMetadata={GLOBLAL_CHAT_USER_DETAILS}
              isGlobalChat
              isUserList
            />
          </NavLink>
        )}
        {listOfLinks
          .filter((email) => email !== currentUser.user_metadata.email)
          .map((element) => (
            <NavLink
              key={element}
              to={`/chat/${element}`}
              className='aside__list-item'
            >
              {element}
            </NavLink>
          ))}
      </div>
    </aside>
  )
}

export default AsideList
