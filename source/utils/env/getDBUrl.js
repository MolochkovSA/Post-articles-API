export const getDBUrl = () => {
  const { DB_URL } = process.env

  if (!DB_URL && typeof DB_URL !== 'String') {
    throw new Error('Environment variable DB_URL must be specified')
  }

  return DB_URL
}
