// Core
import dg from 'debug'

// Models
import { users } from '../models/index.js'
const { create, find, findById, findByIdAndUpdate, findByIdAndDelete } = users

// Instruments
import {
  debug,
  getLockedUserProperties,
  checkLockedProperties,
  ValidationError,
  NotFoundError,
} from '../utils/index.js'

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
  checkLockedProperties(req, getLockedUserProperties())
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
    return res.status(200).json(data)
  }
  throw new NotFoundError(`User not found by id ${id}`, 404)
}

export const updateById = async (req, res) => {
  debug(debugRouter, req)
  checkLockedProperties(req, getLockedUserProperties())
  const id = req.params['userId']
  const data = await findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(data)
}

export const deleteById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['userId']
  await findByIdAndDelete(id)
  res.status(204).send()
}
