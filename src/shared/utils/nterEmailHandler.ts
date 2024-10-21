export const isNterEmail = (email: string): boolean => {
  const nterEmailRegex = /nter\.es$/
  return nterEmailRegex.test(email)
}
