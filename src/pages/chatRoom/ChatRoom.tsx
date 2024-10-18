import { useEffect, useRef, useState } from 'react'
import { RoomDetails, MessagesCard, SendMessage } from './components'
import './chatRoom.css'
import {
  useGlobalMessages,
  usePrivateMessages,
  useSession
} from '../../shared/hooks'
import supabase from '../../shared/services/supabaseClient'

function ChatRoom() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const { userInfo, activeUser } = useSession()
  const { messages } = useGlobalMessages()
  const { filteredMessages, allUsers } = usePrivateMessages({
    messages,
    activeUser,
    selectedUser
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, filteredMessages])

  //! check online users
  const [onlineUsers, setOnlineUsers] = useState<{ user_email: string }[]>([])

  const getOnlineUsers = async () => {
    const { data, error } = await supabase
      .from('online_users')
      .select('user_email')
      .eq('status', 'online')

    if (error) {
      console.error('Error fetching online users:', error.message)
      return []
    }

    return data || []
  }

  const trackUserPresence = async () => {
    // Get the current session
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error.message)
      return
    }

    if (!session || !session.user) {
      console.error('User not authenticated')
      return
    }

    const user = session.user
    console.log('trackUserPresence-User:', user)

    // Upsert the user's presence data
    const { error: upsertError } = await supabase.from('online_users').upsert({
      id: user.id, // Unique user ID from Supabase Auth
      user_email: user.email, // Email from Supabase Auth
      status: 'online',
      last_seen: new Date().toISOString()
    })

    if (upsertError) {
      console.error('Upsert failed:', upsertError.message)
    }

    // Handle user going offline

    window.addEventListener('beforeunload', async () => {
      await supabase
        .from('online_users')
        .update({
          status: 'offline',
          last_seen: new Date().toISOString()
        })
        .eq('user_email', user.email)
    })
  }

  useEffect(() => {
    // Start tracking the current user's presence
    //! should be moved to login and logout to get a better tracking
    trackUserPresence()

    // Fetch and listen for online users
    const fetchOnlineUsers = async () => {
      const users = await getOnlineUsers()
      setOnlineUsers(users)
    }

    fetchOnlineUsers()

    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'online_users' },
        (payload) => {
          console.log('Change detected in online users:', payload)

          // Update the state based on the type of event (INSERT, UPDATE, DELETE)
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'UPDATE'
          ) {
            const updatedUser = payload.new

            // Check if user already exists in onlineUsers
            setOnlineUsers((prev) => {
              const userExists = prev.some(
                (user) => user.user_email === updatedUser.user_email
              )

              // Add new user or update existing one
              if (updatedUser.status === 'online' && !userExists) {
                return [...prev, { user_email: updatedUser.user_email }]
              }

              // Update existing user's status
              return prev.map((user) =>
                user.user_email === updatedUser.user_email
                  ? { user_email: updatedUser.user_email } // Ensure we only keep the user_email
                  : user)
            })
          }

          if (payload.eventType === 'DELETE') {
            const deletedUser = payload.old
            setOnlineUsers((prev) =>
              prev.filter((user) => user.user_email !== deletedUser.user_email))
          }
        }
      )
      .subscribe()

    return () => {
      const markUserOffline = async () => {
        const {
          data: { session }
        } = await supabase.auth.getSession()

        if (session?.user?.email) {
          await supabase
            .from('online_users')
            .update({
              status: 'offline',
              last_seen: new Date().toISOString()
            })
            .eq('user_email', session.user.email)
        }
      }
      markUserOffline()

      supabase.removeChannel(channel)
    }
  }, [activeUser])
  return (
    <section className='chat__room__container'>
      {userInfo && (
        <>
          <RoomDetails userData={userInfo} />
          <div>
            <select
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser || ''}
            >
              <option value=''>Global Chat</option>
              {allUsers
                .filter((email) => email !== activeUser)
                .map((email) => (
                  <option
                    key={email}
                    value={email}
                  >
                    {email}
                  </option>
                ))}
            </select>
          </div>
          {
            <div>
              <h2>Online Users</h2>
              <ul>
                {onlineUsers.map((user, index) => (
                  <li key={index}>{user.user_email}</li>
                ))}
              </ul>
            </div>
          }
          {filteredMessages && (
            <div className='messages__container'>
              <div className='messages__content'>
                <MessagesCard
                  messages={filteredMessages}
                  activeUser={activeUser}
                />
                <div ref={scrollRef}></div>
              </div>
            </div>
          )}
          <SendMessage
            userData={userInfo}
            targetUser={selectedUser}
          />
        </>
      )}
    </section>
  )
}

export default ChatRoom
