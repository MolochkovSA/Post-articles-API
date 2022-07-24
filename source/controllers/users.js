// Core
import dg from 'debug'

// Models
import { users } from '../models/index.js'
const {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findByIdAndMakeAdmin,
  findByIdAndExcludeAdmin,
} = users

// Instruments
import { debug, ValidationError, NotFoundError } from '../utils/index.js'

const debugRouter = dg('router:users')

export const get = async (req, res) => {
  debug(debugRouter, req)
  const data = await find()
  if (data.length) {
    res.status(200).json(data)
  } else {
    res.status(400).json({
      message: 'the database does not contain users',
    })
  }
}

export const post = async (req, res) => {
  debug(debugRouter, req)
  const data = await create(req.body)
  if (data) {
    res.status(201).json(data)
  } else {
    throw new ValidationError('Incorrect payload', 400)
  }
}

export const getById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findById(id)
  if (data) {
    res.status(200).json(data)
  } else {
    throw new NotFoundError(`User not found by id ${id}`, 404)
  }
}

export const updateById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findByIdAndUpdate(id, req.body, { new: true })
  if (data) {
    res.status(200).json(data)
  } else {
    throw new NotFoundError(`User not found by id ${id}`, 404)
  }
}

export const deleteById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findByIdAndDelete(id)
  if (data) {
    res.status(204).send()
  } else {
    throw new NotFoundError(`User not found by id ${id}`, 404)
  }
}

export const makeAdminById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findByIdAndMakeAdmin(id)
  if (data && data.isAdmin === true) {
    res.status(204).send()
  } else {
    throw new NotFoundError(`User not found by id ${id}`, 404)
  }
}

export const excludeAdminById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  const data = await findByIdAndExcludeAdmin(id)
  if (data && data.isAdmin === false) {
    res.status(204).send()
  } else {
    throw new NotFoundError(`User not found by id ${id}`, 404)
  }
}
