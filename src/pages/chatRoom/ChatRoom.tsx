import { useEffect, useRef, useState } from 'react'
import { RoomDetails, MessagesCard, SendMessage, UsersList } from './components'
import {
  useGlobalMessages,
  usePrivateMessages,
  useSession
} from '../../shared/hooks'
import { pathFindChatRoom } from '../../shared/utils/pathHandler'
import './chatRoom.css'

function ChatRoom() {
  const currentChatRoom = pathFindChatRoom()
  console.log(currentChatRoom)

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const { userInfo, activeUser } = useSession()
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
          <UsersList
            allUsers={allUsers}
            currentUser={userInfo}
          />
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
