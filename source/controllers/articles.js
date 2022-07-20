// Core
import dg from 'debug'

// Models
import { articles } from '../models/index.js'
const { create, find, findById, findByIdAndUpdate, findByIdAndDelete } =
  articles
import { users } from '../models/index.js'

// Instruments
import {
  debug,
  getLockedArticleProperties,
  checkLockedProperties,
  ValidationError,
  NotFoundError,
} from '../utils/index.js'

const debugRouter = dg('router:articles')

export const get = async (req, res) => {
  debug(debugRouter, req)
  const data = await find()
  if (data.length) {
    res.status(200).json(data)
  } else {
    res.status(400).json({
      message: 'the database does not contain articles',
    })
  }
}

export const post = async (req, res) => {
  debug(debugRouter, req)
  checkLockedProperties(req, getLockedArticleProperties())
  const authorId = req.locals._id
  req.body.author = authorId
  const data = await create(req.body)
  await users.findByIdAndUpdate(authorId, {
    $push: { articles: data._id },
  })
  if (data) {
    res.status(201).json(data)
  } else {
    throw new ValidationError('Incorrect payload', 400)
  }
}

export const getById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  const data = await findById(id)
  if (data) {
    res.status(200).json(data)
  } else {
    throw new NotFoundError(`Id ${id} not found`, 404)
  }
}

export const updateById = async (req, res) => {
  debug(debugRouter, req)
  checkLockedProperties(req, getLockedArticleProperties())
  const id = req.params['articleId']
  const data = await findByIdAndUpdate(id, { check: false })
  if (data) {
    const data = await findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(data)
  } else {
    throw new NotFoundError(`Id ${id} not found`, 404)
  }
}

export const deleteById = async (req, res) => {
  debug(debugRouter, req)
  const id = req.params['articleId']
  const data = await findByIdAndDelete(id)
  if (data) {
    await users.findByIdAndUpdate(data.author, {
      $pull: { articles: data._id },
    })
    res.status(204).send()
  } else {
    throw new NotFoundError(`Id ${id} not found`, 404)
  }
}
