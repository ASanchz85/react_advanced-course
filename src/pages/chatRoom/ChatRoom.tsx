import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ContentWrapper, MainWrapper } from '../../theme/layout/components'
import {
  RoomDetails,
  MessagesCard,
  SendMessage,
  NoMessagesYet,
  UserList
} from './components'
import {
  useGlobalMessages,
  usePrivateMessages,
  useSession
} from '../../shared/hooks'
import './chatRoom.css'

function ChatRoom() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { targetUser } = useParams()
  const { userInfo, activeUser } = useSession()
  const { messages } = useGlobalMessages()
  const { filteredMessages, allUsers } = usePrivateMessages({
    messages,
    activeUser,
    selectedUser
  })

  useEffect(() => {
    setSelectedUser(targetUser ? targetUser : null)
  }, [targetUser])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, filteredMessages])

  return (
    <>
      {userInfo && (
        <MainWrapper
          asideContent={
            <UserList
              listOfLinks={allUsers}
              currentUser={userInfo}
            />
          }
          headerDetails={<RoomDetails userData={userInfo} />}
          mainContent={
            filteredMessages && (
              <>
                <ContentWrapper>
                  {filteredMessages.length > 0 ? (
                    <MessagesCard
                      messages={filteredMessages}
                      activeUser={activeUser}
                    />
                  ) : (
                    <NoMessagesYet />
                  )}
                  <div ref={scrollRef}></div>
                </ContentWrapper>
                <SendMessage
                  userData={userInfo}
                  targetUser={selectedUser}
                />
              </>
            )
          }
        />
      )}
    </>
  )
}

export default ChatRoom
