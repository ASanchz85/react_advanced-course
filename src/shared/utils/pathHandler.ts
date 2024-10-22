export const findTitleViewByPath = () => {
  const path = window.location.pathname.split('/')
  const title = path.pop() ?? ''
  return title
}

export const isChatInPath = () => {
  const path = window.location.pathname
  return path.includes('chat')
}
