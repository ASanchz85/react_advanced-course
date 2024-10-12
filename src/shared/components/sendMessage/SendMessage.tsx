import { FormEvent, useState } from 'react'
import { TbSend2 } from 'react-icons/tb'

function SendMessage() {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage.trim()) {
      return
    }

    console.log('Message Sent:', newMessage)
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
