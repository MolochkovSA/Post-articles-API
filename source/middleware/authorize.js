// Core
import jwt from 'jsonwebtoken'

// Models
import { tokenStorage } from '../models/index.js'

// Instruments
import { AuthorizeError } from '../utils/index.js'

export const authorize = async (req, res, next) => {
  const token = req.get('X-token')
  if (!token) {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }

  const tokenObj = await tokenStorage.findOne({ token: token })
  if (!tokenObj) {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }

  try {
    const verify = await jwt.verify(token, tokenObj.key)
    req.locals = verify
    next()
  } catch {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }
}
