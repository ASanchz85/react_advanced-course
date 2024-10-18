import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import {
  TABLE_REALTIME_EVENTS,
  TABLE_SCHEMA,
  TABLE_SQL_NAMES,
  TABLE_SQL_QUERIES,
  TABLE_USER_FIELDS,
  TABLE_USER_STATUS
} from '../config/constants'

export const useGetOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<{ user_email: string }[]>([])

  const getOnlineUsers = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLE_SQL_NAMES.ONLINE_USERS)
        .select(TABLE_USER_FIELDS.USER_EMAIL)
        .eq(TABLE_USER_FIELDS.STATUS, TABLE_USER_STATUS.ONLINE)

      if (error) {
        throw new Error(error.message || 'Error fetching online users')
      }

      setOnlineUsers(data)
    } catch (error) {
      if (error instanceof Error) {
        console.error('[ERROR]:', error.message)
      }
    }
  }

  useEffect(() => {
    getOnlineUsers()

    const channel = supabase
      .channel(TABLE_SQL_QUERIES.SELECT_ALL)
      .on(
        TABLE_REALTIME_EVENTS.POSTGRES_CHANGES,
        {
          event: TABLE_SQL_QUERIES.SELECT_ALL,
          schema: TABLE_SCHEMA.PUBLIC,
          table: TABLE_SQL_NAMES.ONLINE_USERS
        },
        (payload) => {
          if (
            payload.eventType === TABLE_SQL_QUERIES.INSERT ||
            payload.eventType === TABLE_SQL_QUERIES.UPDATE
          ) {
            const updatedUser = payload.new

            setOnlineUsers((prev) => {
              const userExists = prev.some(
                (user) => user.user_email === updatedUser.user_email
              )

              if (
                updatedUser.status === TABLE_USER_STATUS.ONLINE &&
                !userExists
              ) {
                return [...prev, { user_email: updatedUser.user_email }]
              }

              return prev.map((user) =>
                user.user_email === updatedUser.user_email
                  ? { user_email: updatedUser.user_email }
                  : user)
            })
          }

          if (payload.eventType === TABLE_SQL_QUERIES.DELETE) {
            const deletedUser = payload.old
            setOnlineUsers((prev) =>
              prev.filter((user) => user.user_email !== deletedUser.user_email))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { onlineUsers }
}
