export const getPassword = () => {
  const { JWT_PASSWORD } = process.env

  if (!JWT_PASSWORD) {
    throw new Error('Environment variable JWT_PASSWORD should be specified')
  }

  const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(
    JWT_PASSWORD
  )

  if (!isValid) {
    throw new Error(
      'Environment variable JWT_PASSWORD should have a minimum eight characters, at least one letter, one number and one special character'
    )
  }

  return JWT_PASSWORD
}
