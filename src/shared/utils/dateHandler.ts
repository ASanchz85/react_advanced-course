export function formatDateHumanReadable(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString()
}

export const getHourFromDate = (date: string) => {
  const completeHour = formatDateHumanReadable(date).split(' ')[1]
  return completeHour.slice(0, 5)
}
