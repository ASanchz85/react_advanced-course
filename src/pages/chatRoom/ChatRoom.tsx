import { useEffect, useState } from 'react'
import Messages from '../../shared/components/messages/Messages'
import SendMessage from '../../shared/components/sendMessage/SendMessage'
import supabase from '../../shared/services/supabaseClient'
import Header from '../../theme/layout/components/header/Header'
import './chatRoom.css'

interface UserMetadata {
  avatar_url: string
  full_name: string
  email: string
}

export interface ChatUser {
  user_metadata: UserMetadata
}

function ChatRoom() {
  const [userInfo, setUserInfo] = useState<ChatUser | null>(null)

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data?.session?.user?.user_metadata) {
      const { avatar_url, full_name, email } = data.session.user.user_metadata

      setUserInfo({ user_metadata: { avatar_url, full_name, email } })
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <>
      {userInfo && (
        <>
          <Header userData={userInfo} />
          <Messages />
          <SendMessage userData={userInfo} />
        </>
      )}
    </>
  )
}

export default ChatRoom
