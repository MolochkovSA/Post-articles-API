import bcrypt from 'bcryptjs'

export const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash)
  return result
}
