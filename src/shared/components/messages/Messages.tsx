import { useEffect, useRef, useState } from 'react'
import { formatDateHumanReadable } from '../../utils/dateHandler'
import supabase from '../../services/supabaseClient'

interface Message {
  id: number
  content: string
  email: string
  created_at: string
}

function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [activeUser, setActiveUser] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const getMessages = async () => {
    try {
      const { data, error } = await supabase.from('messages').select('*')

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

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (!data) {
      console.error('No session data found')
    }

    if (data?.session?.user?.email) {
      setActiveUser(data?.session?.user?.email)
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as Message
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
    <section className='room__container'>
      {messages && (
        <div
          className='chat__messages__container'
          style={{
            height: '600px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className='chat__message'
              style={{
                padding: '1rem',
                border: '1px solid lightgray',
                borderRadius: '0.5rem',
                margin: '1rem',
                color: 'black',
                backgroundColor:
                  activeUser === message.email ? 'lightgreen' : 'white',
                alignSelf:
                  activeUser === message.email ? 'flex-end' : 'flex-start'
              }}
            >
              <p>{message.content}</p>
              <p>{message.email}</p>
              <p>{formatDateHumanReadable(message.created_at)}</p>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      )}
    </section>
  )
}

export default Messages
