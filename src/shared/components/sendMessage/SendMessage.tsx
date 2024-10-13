import { FormEvent, useState } from 'react'
import { TbSend2 } from 'react-icons/tb'
import supabase from '../../services/supabaseClient'
import type { ChatUser } from '../../../pages/chatRoom/ChatRoom'

interface SendMessageProps {
  userData: ChatUser
}

function SendMessage({ userData }: SendMessageProps) {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim()) {
      return
    }

    const insertMessage = await supabase.from('messages').insert({
      content: newMessage,
      email: userData.user_metadata.email
    })

    if (insertMessage.error) {
      console.error('Error inserting message:', insertMessage.error.message)
      return
    }

    setNewMessage('')
  }

  return (
    <section className='send__message'>
      <form
        onSubmit={handleSendMessage}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%'
        }}
      >
        <input
          type='text'
          placeholder='Type a message...'
          className='send__message__input'
          style={{ width: '100%' }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type='submit'
          className='send__message__button'
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Send
          <TbSend2 />
        </button>
      </form>
    </section>
  )
}

export default SendMessage
