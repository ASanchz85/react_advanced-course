import { useEffect, useState } from 'react'
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
    console.log('session:', data)
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <section className='room__container'>
      {messages && (
        <div className='chat__messages__container' style={{ backgroundColor: 'lightblue' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className='chat__message'
            >
              <p>{message.content}</p>
              <p>{message.email}</p>
              <p>{formatDateHumanReadable(message.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Messages
