// Core
import jwt from 'jsonwebtoken'

// Models
import { auth } from '../models/index.js'

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
  const [header, paylod, signature] = token.split('.')
  const { _id } = JSON.parse(Buffer.from(paylod, 'base64').toString())

  const obj = await auth.findOne({ userId: _id })
  if (!obj) {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }

  try {
    const verify = await jwt.verify(token, obj.key)
    req.locals = verify
    next()
  } catch {
    throw new AuthorizeError(
      'That may be, but you have no right to access it',
      403
    )
  }
}
