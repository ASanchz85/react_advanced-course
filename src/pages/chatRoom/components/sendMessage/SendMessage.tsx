import { FormEvent, useState } from 'react'
import { Footer } from '../../../../theme/layout/components'
import { TbSend2 } from 'react-icons/tb'
import supabase from '../../../../shared/services/supabaseClient'
import type { ChatUser } from '../../../../shared/types/user'
import './sendMessage.css'

interface SendMessageProps {
  userData: ChatUser
  targetUser: string | null
}

function SendMessage({ userData, targetUser }: SendMessageProps) {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim()) {
      return
    }

    const insertMessage = await supabase.from('messages').insert({
      content: newMessage,
      email_sender: userData.user_metadata.email,
      email_receiver: targetUser || null
    })

    if (insertMessage.error) {
      console.error('Error inserting message:', insertMessage.error.message)
      return
    }

    setNewMessage('')
  }

  return (
    <Footer>
      <form onSubmit={handleSendMessage}>
        <input
          type='text'
          placeholder='Type a message...'
          className='send__message__input'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type='submit'
          className='send__message__button'
        >
          Send
          <TbSend2 />
        </button>
      </form>
    </Footer>
  )
}

export default SendMessage
