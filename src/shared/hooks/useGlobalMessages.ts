import { useEffect, useState } from 'react'
import { useToast } from '../context/ToastContext'
import supabase from '../services/supabaseClient'
import { ERROR_MESSAGES, TOAST_TYPES } from '../config/constants'
import {
  TABLE_REALTIME_EVENTS,
  TABLE_SCHEMA,
  TABLE_SQL_NAMES,
  TABLE_SQL_QUERIES
} from '../config/tableConstants'
import type { Message } from '../types/messages'

export const useGlobalMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const { addToast } = useToast()

  const getMessages = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLE_SQL_NAMES.MESSAGES)
        .select(TABLE_SQL_QUERIES.SELECT_ALL)

      if (error) {
        throw error
      }

      setMessages(data)
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          message: error.message || ERROR_MESSAGES.CONNECTION,
          type: TOAST_TYPES.ERROR
        })
      }
    }
  }

  useEffect(() => {
    getMessages()

    const channel = supabase
      .channel(TABLE_SQL_QUERIES.SELECT_ALL)
      .on(
        TABLE_REALTIME_EVENTS.POSTGRES_CHANGES,
        {
          event: TABLE_SQL_QUERIES.INSERT,
          schema: TABLE_SCHEMA.PUBLIC,
          table: TABLE_SQL_NAMES.MESSAGES
        },
        (payload: { new: Message }) => {
          const newMessage = payload.new
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

  return { messages }
}
