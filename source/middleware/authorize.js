// Core
import jwt from 'jsonwebtoken'

// Models
import { auth } from '../models/index.js'

// Instruments
import { getPassword, getIdFromToken, AuthorizeError } from '../utils/index.js'

export const authorize = async (req, res, next) => {
  const token = req.get('X-token')
  if (!token) {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }

  const id = getIdFromToken(token)

  const obj = await auth.findOne({ userId: id })

  if (!obj) {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }

  const key = getPassword() + obj.salt

  try {
    const verify = await jwt.verify(token, key)
    req.locals = verify
    next()
  } catch {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }
}
