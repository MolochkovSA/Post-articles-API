//Object Data Modelling (ODM)
import { articles } from '../odm/index.js'

// Services
import { users } from './index.js'

// Instruments
import { ValidationError, NotFoundError } from '../utils/index.js'

export const create = async (obj) => {
  const data = await articles.create(obj)
  if (!data) {
    throw new ValidationError('Incorrect payload')
  }
  await users.findByIdAndUpdate(obj.author, {
    $push: { articles: data._id },
  })
  return data
}

export const find = async () => {
  const data = await articles.find().populate({
    path: 'author',
  })
  return data
}

export const findById = async (id) => {
  const data = await articles.findById(id).populate({
    path: 'author',
  })
  if (!data) {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
  return data
}

export const findByIdAndUpdate = async (id, obj) => {
  const uncheck = await articles.findByIdAndUpdate(id, { check: false })
  if (!uncheck) {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
  const data = await articles
    .findByIdAndUpdate(id, obj, { new: true })
    .populate({
      path: 'author',
    })
  return data
}

export const findByIdAndDelete = async (id) => {
  const data = await articles.findByIdAndDelete(id)
  if (!data) {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
  await users.findByIdAndUpdate(data.author, {
    $pull: { articles: data._id },
  })
}

export const findByIdAndApprove = async (id) => {
  const data = await articles.findByIdAndUpdate(
    id,
    { check: true },
    { new: true }
  )
  if (!data || data.check !== true) {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
}

export const findByIdAndDisapprove = async (id) => {
  const data = await articles.findByIdAndUpdate(
    id,
    { check: false },
    { new: true }
  )
  if (!data || data.check !== false) {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
}
