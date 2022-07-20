import bcrypt from 'bcryptjs'

export const passwordToHash = async (password) => {
  const hash = await bcrypt.hash(password, 10)
  return hash
}
