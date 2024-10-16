import { emailParser } from '../../../../shared/utils/stringHandler'
// import { getTimePassed } from '../../../../shared/utils/dateHandler'
import type { Message } from '../../../../shared/types/messages'
import './messagesCard.css'
import { getHourFromDate } from '../../../../shared/utils/dateHandler'

interface MessagesCardProps {
  messages: Message[]
  activeUser: string
}

function MessagesCard({ messages, activeUser }: MessagesCardProps) {
  return (
    <>
      {messages &&
        messages.map((message) => (
          <div
            key={message.id}
            className={`single__message ${
              activeUser === message.email ? 'sent' : 'received'
            }`}
          >
            <p>{emailParser(message.email)}</p>
            <p>{message.content}</p>
            <span
              className={`single__message-hour ${
                activeUser === message.email ? 'sent' : 'received'
              }`}
            >
              at {getHourFromDate(message.created_at)}
            </span>
          </div>
        ))}
    </>
  )
}

export default MessagesCard
