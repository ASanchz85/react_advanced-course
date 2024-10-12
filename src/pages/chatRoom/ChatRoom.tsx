import { useEffect, useState } from 'react'
import Messages from '../../shared/components/messages/Messages'
import SendMessage from '../../shared/components/sendMessage/SendMessage'
import supabase from '../../shared/services/supabaseClient'
import Header from '../../theme/layout/components/header/Header'
import type { Session } from '@supabase/supabase-js'
import './chatRoom.css'

function ChatRoom() {
  const [userInfo, setUserInfo] = useState<Session | null>(null)

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data) {
      setUserInfo(data.session)
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <>
      <Header userData={userInfo} />
      <Messages />
      <SendMessage />
    </>
  )
}

export default ChatRoom
