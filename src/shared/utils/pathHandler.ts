import { capitalizeFirstLetter } from './stringHandler'

export const findTitleViewByPath = () => {
  const path = window.location.pathname.split('/')
  const title = path.pop() ?? ''

  if (title.includes('-')) {
    const titleArr = title.split('-')
    let newTitle = ''

    titleArr.forEach((word) => {
      newTitle += capitalizeFirstLetter(word) + ' '
    })

    return newTitle.trim()
  }

  return title
}

export const isChatInPath = () => {
  const path = window.location.pathname
  return path.includes('chat')
}
