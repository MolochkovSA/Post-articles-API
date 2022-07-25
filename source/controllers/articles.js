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

// Views
import { ArticleView, ArticlesView } from '../views/index.js'

// Instruments
import { debug } from '../utils/index.js'

const debugRouter = dg('router:articles')

export const post = async (req, res) => {
  debug(debugRouter, req)
  req.body.author = req.locals._id
  const data = await create(req.body)
  const articleProfile = ArticleView(data)
  res.status(201).json(articleProfile)
}

export const get = async (req, res) => {
  debug(debugRouter, req)
  const data = await find()
  const articleProfile = ArticlesView(data)
  res.status(200).json(articleProfile)
}

export const getById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  const data = await findById(id)
  const articleProfile = ArticleView(data)
  res.status(200).json(articleProfile)
}

export const updateById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  const data = await findByIdAndUpdate(id, req.body)
  const articleProfile = ArticleView(data)
  res.status(200).json(articleProfile)
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
