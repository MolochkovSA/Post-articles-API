// Core
import dg from 'debug'

// Models
import { auth } from '../models/index.js'
const { findOneAndDelete } = auth

// Instruments
import { debug, getIdFromToken } from '../utils/index.js'

const debugRouter = dg('router:auth')

export const login = async (req, res, next) => {
  debug(debugRouter, req)
  res.status(204).send()
}

export const logout = async (req, res, next) => {
  debug(debugRouter, req)
  const token = req.get('X-token')
  const id = getIdFromToken(token)
  await findOneAndDelete({ userId: id })
  res.status(204).send()
}
