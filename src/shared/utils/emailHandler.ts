export const isNterEmail = (email: string): boolean => {
  const nterEmailRegex = /nter\.es$/
  return nterEmailRegex.test(email)
}

export function emailParser(email: string): string {
  const emailName = email.split('@')[0]
  return `@${emailName}`
}
