import { useEffect, useRef, useState } from 'react'
import { RoomDetails, MessagesCard, SendMessage } from './components'
import supabase from '../../shared/services/supabaseClient'
import {
  TABLE_REALTIME_EVENTS,
  TABLE_SCHEMA,
  TABLE_SQL_NAMES,
  TABLE_SQL_QUERIES
} from '../../shared/config/constants'
import type { Message } from '../../shared/types/messages'
import type { ChatUser } from '../../shared/types/user'
import './chatRoom.css'

function ChatRoom() {
  const [userInfo, setUserInfo] = useState<ChatUser | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [activeUser, setActiveUser] = useState('')

  //? private chat
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [allUsers, setAllUsers] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    //!
    console.log('getSession-data:', data)

    if (data?.session?.user?.user_metadata) {
      const { avatar_url, full_name, email } = data.session.user.user_metadata

      setUserInfo({ user_metadata: { avatar_url, full_name, email } })
    }

    if (data?.session?.user?.email) {
      setActiveUser(data?.session?.user?.email)
    }
  }

  const getMessages = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLE_SQL_NAMES.MESSAGES)
        .select(TABLE_SQL_QUERIES.SELECT_ALL)

      if (error) {
        throw error
      }

      setMessages(data)

      const uniqueUsers = Array.from(
        new Set(data.map((message: Message) => message.email_sender))
      )
      setAllUsers(uniqueUsers)

      //!
      console.log('getSession-uniqueUsers:', uniqueUsers)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching messages:', error.message)
      }
    }
  }

  const filterMessages = () => {
    if (selectedUser) {
      const privateMessages = messages.filter(
        (message) =>
          (message.email_sender === activeUser &&
            message.email_receiver === selectedUser) ||
          (message.email_sender === selectedUser &&
            message.email_receiver === activeUser)
      )
      setFilteredMessages(privateMessages)
    } else {
      const globalMessages = messages.filter(
        (message) => message.email_receiver === null
      )
      setFilteredMessages(globalMessages)
    }
  }

  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        TABLE_REALTIME_EVENTS.POSTGRES_CHANGES,
        {
          event: TABLE_SQL_QUERIES.INSERT,
          schema: TABLE_SCHEMA.PUBLIC,
          table: TABLE_SQL_NAMES.MESSAGES
        },
        (payload: { new: Message }) => {
          const newMessage = payload.new
          setMessages((prevMessages: Message[]) => [
            ...prevMessages,
            newMessage
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <section className='chat__room__container'>
      {userInfo && (
        <>
          <RoomDetails userData={userInfo} />
          {/* User Selector for Private Chat */}
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
            selectedUser={selectedUser}
          />{' '}
          {/* Pass selectedUser */}
        </>
      )}
    </section>
    // <section className='chat__room__container'>
    //   {userInfo && (
    //     <>
    //       <RoomDetails userData={userInfo} />
    //       {messages && (
    //         <div className='messages__container'>
    //           <div className='messages__content'>
    //             <MessagesCard
    //               messages={messages}
    //               activeUser={activeUser}
    //             />
    //             <div ref={scrollRef}></div>
    //           </div>
    //         </div>
    //       )}
    //       <SendMessage userData={userInfo} />
    //     </>
    //   )}
    // </section>
  )
}

export default ChatRoom
