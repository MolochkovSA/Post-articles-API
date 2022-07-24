export const getAdminEmail = () => {
  const { ADMIN_EMAIL } = process.env

  if (!ADMIN_EMAIL) {
    throw new Error('Invironment variable ADMIN_EMAIL should be specified')
  }

  const isValid = /^[^\s\W]+@[^\s\W]+\.[^\s\W]+$/.test(ADMIN_EMAIL)

  if (!isValid) {
    throw new Error('Environment variable ADMIN_EMAIL should be a valid email')
  }

  return ADMIN_EMAIL
}
