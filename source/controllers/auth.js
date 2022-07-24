// Core
import dg from 'debug'

// Services
import { auth } from '../services/index.js'
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
  await findOneAndDelete(token)
  res.status(204).send()
}
