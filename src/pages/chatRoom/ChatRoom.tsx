import { useEffect, useRef, useState } from 'react'
import { RoomDetails, MessagesCard, SendMessage } from './components'
import supabase from '../../shared/services/supabaseClient'
import {
  TABLE_REALTIME_EVENTS,
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

  const scrollRef = useRef<HTMLDivElement>(null)

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

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
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching messages:', error.message)
      }
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
      .channel(TABLE_SQL_QUERIES.SELECT_ALL)
      .on(
        TABLE_REALTIME_EVENTS.POSTGRES_CHANGES,
        {
          event: TABLE_SQL_QUERIES.INSERT,
          schema: 'public',
          table: 'messages'
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
          {messages && (
            <div className='messages__container'>
              <MessagesCard
                messages={messages}
                activeUser={activeUser}
              />
              <div ref={scrollRef}></div>
            </div>
          )}

          <SendMessage userData={userInfo} />
        </>
      )}
    </section>
  )
}

export default ChatRoom
