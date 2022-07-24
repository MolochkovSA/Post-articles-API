export const getAdminPassword = () => {
  const { ADMIN_PASSWORD } = process.env

  if (!ADMIN_PASSWORD) {
    throw new Error('Invironment variable ADMIN_PASSWORD should be specified')
  }

  const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(
    ADMIN_PASSWORD
  )

  if (!isValid) {
    throw new Error(
      'Environment variable ADMIN_PASSWORD should have a minimum eight characters, at least one letter, one number and one special character'
    )
  }

  return ADMIN_PASSWORD
}
