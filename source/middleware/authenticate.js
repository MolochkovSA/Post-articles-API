// Core
import jwt from 'jsonwebtoken'
import randomize from 'randomatic'

// Services
import { users, auth } from '../services/index.js'

// Instruments
import {
  comparePassword,
  AuthorizeError,
  getPayloadFromToken,
} from '../utils/index.js'

// Config
import { JWT_PASSWORD } from '../config.js'

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    throw new AuthorizeError('Сredentials are not valid', 401)
  }

  const [type, credentials] = authHeader.split(' ')
  const [email, password] = Buffer.from(credentials, 'base64')
    .toString()
    .split(':')

  const user = await users.findOne({ email: email })

  if (!user) {
    throw new AuthorizeError('Сredentials are not valid', 401)
  }

  const result = await comparePassword(password, user.password)
  if (!result) {
    throw new AuthorizeError('Сredentials are not valid', 401)
  }

  const salt = randomize('Aa0!', 30)
  const key = JWT_PASSWORD + salt
  const token = await jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, key)

  const payload = getPayloadFromToken(token)

  const storage = await auth.create({
    payload: payload,
    salt: salt,
  })

  if (!storage) {
    throw new AuthorizeError('Token is not written to the database', 401)
  }

  res.setHeader('X-Token', token)
  next()
}
