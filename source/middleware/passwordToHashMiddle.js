// Instruments
import { passwordToHash } from '../utils/passwordHash/index.js'

export const passwordToHashMiddle = async (req, res, next) => {
  const password = req.body.password
  if (password) {
    req.body.password = await passwordToHash(password)
  }
  return next()
}
