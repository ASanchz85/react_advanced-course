export function formatDateHumanReadable(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString()
}

export const getHourFromDate = (date: string) => {
  return formatDateHumanReadable(date).split(' ')[1]
}
