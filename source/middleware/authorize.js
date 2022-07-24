// Core
import jwt from 'jsonwebtoken'

// Services
import { auth } from '../services/index.js'

// Instruments
import { getIdFromToken, AuthorizeError } from '../utils/index.js'

// Config
import { JWT_PASSWORD } from '../config.js'

export const authorize = async (req, res, next) => {
  const token = req.get('X-token')
  if (!token) {
    throw new AuthorizeError('That may be, but you have no right to access it')
  }

  const id = getIdFromToken(token)

  const obj = await auth.findOne({ userId: id })

  if (!obj) {
    throw new AuthorizeError('That may be, but you have no right to access it')
  }

  const key = JWT_PASSWORD + obj.salt

  try {
    const verify = await jwt.verify(token, key)
    req.locals = verify
    next()
  } catch {
    throw new AuthorizeError('That may be, but you have no right to access it')
  }
}
