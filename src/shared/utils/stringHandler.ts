export function emailParser(email: string): string {
  const emailName = email.split('@')[0]
  return `@${emailName}`
}
