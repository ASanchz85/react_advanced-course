import { useEffect, useRef, useState } from 'react'
import { RoomDetails, MessagesCard, SendMessage } from './components'
import './chatRoom.css'
import {
  useGetOnlineUsers,
  useGlobalMessages,
  usePrivateMessages,
  useSession
} from '../../shared/hooks'

function ChatRoom() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const { userInfo, activeUser } = useSession()
  const { onlineUsers } = useGetOnlineUsers()
  const { messages } = useGlobalMessages()
  const { filteredMessages, allUsers } = usePrivateMessages({
    messages,
    activeUser,
    selectedUser
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, filteredMessages])

  return (
    <section className='chat__room__container'>
      {userInfo && (
        <div className='chat__room__content'>
          <div className='users__container'>
            <h2>Online Users</h2>
            <ul className='users__list'>
              <li className='users__list-item'>Global Chat</li>
              {allUsers
                .filter((email) => email !== activeUser)
                .map((email) => (
                  <li
                    key={email}
                    value={email}
                    onClick={() => setSelectedUser(email)}
                    className='users__list-item'
                  >
                    {email}
                  </li>
                ))}
              {/*               {onlineUsers.map((user, index) => (
                    <li key={index}>{user.user_email}</li>
                  ))} */}
            </ul>
          </div>
          <div className='messages__container'>
            <RoomDetails userData={userInfo} />
            {filteredMessages && (
              <div className='messages__content'>
                <MessagesCard
                  messages={filteredMessages}
                  activeUser={activeUser}
                />
                <div ref={scrollRef}></div>
              </div>
            )}
            <SendMessage
              userData={userInfo}
              targetUser={selectedUser}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default ChatRoom
