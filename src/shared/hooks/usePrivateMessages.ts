import { useEffect, useState } from 'react'
import type { Message } from '../types/messages'

interface UsePrivateMessagesProps {
  messages: Message[]
  activeUser: string
  selectedUser: string | null
}

export const usePrivateMessages = ({
  messages,
  activeUser,
  selectedUser
}: UsePrivateMessagesProps) => {
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [allUsers, setAllUsers] = useState<string[]>([])

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
    const uniqueUsers = Array.from(
      new Set(messages.map((message: Message) => message.email_sender))
    )
    setAllUsers(uniqueUsers)

    filterMessages()
  }, [messages, selectedUser])

  return { filteredMessages, allUsers }
}
