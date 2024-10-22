export const pathFindChatRoom = () => {
  const path = window.location.pathname.split('/')
  const chatroom = path.pop() ?? ''
  return chatroom
}
