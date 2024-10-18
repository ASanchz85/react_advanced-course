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
        <>
          <RoomDetails userData={userInfo} />
          <div>
            <select
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser || ''}
            >
              <option value=''>Global Chat</option>
              {allUsers
                .filter((email) => email !== activeUser)
                .map((email) => (
                  <option
                    key={email}
                    value={email}
                  >
                    {email}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <h2>Online Users</h2>
            <ul>
              {onlineUsers.map((user, index) => (
                <li key={index}>{user.user_email}</li>
              ))}
            </ul>
          </div>
          {filteredMessages && (
            <div className='messages__container'>
              <div className='messages__content'>
                <MessagesCard
                  messages={filteredMessages}
                  activeUser={activeUser}
                />
                <div ref={scrollRef}></div>
              </div>
            </div>
          )}
          <SendMessage
            userData={userInfo}
            targetUser={selectedUser}
          />
        </>
      )}
    </section>
  )
}

export default ChatRoom
