// Core
import dg from 'debug'

// Models
import { auth } from '../models/index.js'
const { findOneAndDelete } = auth

// Instruments
import { debug } from '../utils/index.js'

const debugRouter = dg('router:auth')

export const login = async (req, res, next) => {
  debug(debugRouter, req)
  res.status(204).send()
}

export const logout = async (req, res, next) => {
  debug(debugRouter, req)
  const token = req.get('X-token')
  const [header, paylod, signature] = token.split('.')
  const { _id } = JSON.parse(Buffer.from(paylod, 'base64').toString())
  await findOneAndDelete({ userId: _id })
  res.status(204).send()
}
