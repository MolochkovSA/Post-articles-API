export const getAdminProfile = () => {
  const ADMIN = process.env.ADMIN
  return JSON.parse(ADMIN)
}
