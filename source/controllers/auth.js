// Core
import dg from 'debug'

// Models
import { tokenStorage } from '../models/index.js'
const { findOneAndDelete } = tokenStorage

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
  await tokenStorage.findOneAndDelete({ token: token })
  res.status(204).send()
}
