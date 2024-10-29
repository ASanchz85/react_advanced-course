import { FormEvent, useState } from 'react'
import { Footer } from '../../../../theme/layout/components'
import { TbSend2 } from 'react-icons/tb'
import { useToast } from '../../../../shared/context/ToastContext'
import supabase from '../../../../shared/services/supabaseClient'
import { TABLE_SQL_NAMES } from '../../../../shared/config/tableConstants'
import {
  ERROR_MESSAGES,
  TOAST_TYPES
} from '../../../../shared/config/constants'
import type { ChatUser } from '../../../../shared/types/user'
import './sendMessage.css'

interface SendMessageProps {
  userData: ChatUser
  targetUser: string | null
}

function SendMessage({ userData, targetUser }: SendMessageProps) {
  const [newMessage, setNewMessage] = useState('')
  const { addToast } = useToast()

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim()) {
      return
    }

    const insertMessage = await supabase.from(TABLE_SQL_NAMES.MESSAGES).insert({
      content: newMessage,
      email_sender: userData.user_metadata.email,
      email_receiver: targetUser || null
    })

    if (insertMessage.error) {
      addToast({
        message: insertMessage.error.message || ERROR_MESSAGES.MESSAGE,
        type: TOAST_TYPES.ERROR
      })
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
