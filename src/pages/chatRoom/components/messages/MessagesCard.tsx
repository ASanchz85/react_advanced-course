import { formatDateHumanReadable } from '../../../../shared/utils/dateHandler'
import type { Message } from '../../../../shared/types/messages'

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
            <p>{message.content}</p>
            <p>{message.email}</p>
            <p>{formatDateHumanReadable(message.created_at)}</p>
          </div>
        ))}
    </>
  )
}

export default MessagesCard
