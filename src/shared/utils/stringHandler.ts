export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getInitials = (name: string) => {
  const words = name.split(' ')
  return words.map((word) => word.charAt(0).toUpperCase()).join('')
}

export const getFirstTwoLetters = (name: string) => {
  return name.slice(0, 2).toUpperCase()
}
