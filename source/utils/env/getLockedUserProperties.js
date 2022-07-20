export const getLockedUserProperties = () => {
  const LOCKED_USER_PROPERTIES = process.env.LOCKED_USER_PROPERTIES
  return LOCKED_USER_PROPERTIES.split(', ')
}
