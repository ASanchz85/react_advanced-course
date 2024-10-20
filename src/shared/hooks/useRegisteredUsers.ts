import { useEffect, useState } from 'react'
import type { Message } from '../types/messages'

interface UseRegisteredUsersProps {
  messages: Message[]
}

export const useRegisteredUsers = ({ messages }: UseRegisteredUsersProps) => {
  const [registeredUsers, setRegisteredUsers] = useState<string[]>([])

  useEffect(() => {
    const uniqueUsers = Array.from(
      new Set(messages.map((message: Message) => message.email_sender))
    )
    setRegisteredUsers(uniqueUsers)
  }, [messages])

  return { registeredUsers }
}
