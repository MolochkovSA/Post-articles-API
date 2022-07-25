// Core
import dg from 'debug'

// Services
import { users } from '../services/index.js'
const {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findByIdAndMakeAdmin,
  findByIdAndExcludeAdmin,
} = users

// Views
import { upsertUserView, findUserView, findUsersView } from '../views/index.js'

// Instruments
import { debug } from '../utils/index.js'

const debugRouter = dg('router:users')

export const post = async (req, res) => {
  debug(debugRouter, req)
  const data = await create(req.body)
  const userProfile = upsertUserView(data)
  res.status(201).json(userProfile)
}

export const get = async (req, res) => {
  debug(debugRouter, req)
  const data = await find()
  const usersProfiles = findUsersView(data)

  res.status(200).json(usersProfiles)
}

export const getById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findById(id)
  const userProfile = findUserView(data)
  res.status(200).json(userProfile)
}

export const updateById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findByIdAndUpdate(id, req.body)
  const userProfile = upsertUserView(data)
  res.status(200).json(userProfile)
}

export const deleteById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  await findByIdAndDelete(id)
  res.status(204).send()
}

export const makeAdminById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  await findByIdAndMakeAdmin(id)
  res.status(204).send()
}

export const excludeAdminById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  await findByIdAndExcludeAdmin(id)
  res.status(204).send()
}
