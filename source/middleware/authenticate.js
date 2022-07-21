// Core
import jwt from 'jsonwebtoken'
import randomize from 'randomatic'

// Models
import { users, auth } from '../models/index.js'

// Instruments
import { getPassword, comparePassword, AuthorizeError } from '../utils/index.js'

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

  const existingAuth = await auth.findOne({ userId: user._id })
  if (existingAuth) {
    await auth.findOneAndDelete({ userId: user._id })
  }

  const salt = randomize('Aa0!', 30)
  const key = getPassword() + salt
  const token = await jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, key)

  const storage = await auth.create({
    userId: user._id,
    salt: salt,
  })
  if (!storage) {
    throw new AuthorizeError('Token is not written to the database', 400)
  }

  res.setHeader('X-Token', token)
  next()
}
