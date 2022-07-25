// Core
import dg from 'debug'

// Services
import { articles } from '../services/index.js'
const {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findByIdAndApprove,
  findByIdAndDisapprove,
} = articles

// Instruments
import { debug, NotFoundError } from '../utils/index.js'

const debugRouter = dg('router:articles')

export const post = async (req, res) => {
  debug(debugRouter, req)
  req.body.author = req.locals._id
  const data = await create(req.body)
  res.status(201).json(data)
}

export const get = async (req, res) => {
  debug(debugRouter, req)
  const data = await find()
  res.status(200).json(data)
}

export const getById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  const data = await findById(id)
  res.status(200).json(data)
}

export const updateById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  const data = await findByIdAndUpdate(id, req.body)
  res.status(200).json(data)
}

export const deleteById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  await findByIdAndDelete(id)
  res.status(204).send()
}

export const approveById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  await findByIdAndApprove(id)
  res.status(204).send()
}

export const disapproveById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  await findByIdAndDisapprove(id)
  res.status(204).send()
}
