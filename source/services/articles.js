//Object Data Modelling (ODM)
import { articles } from '../odm/index.js'

// Services
import { users } from './index.js'

// Instruments
import { ValidationError, NotFoundError } from '../utils/index.js'

export const create = async (obj) => {
  const data = await articles.create(obj)
  console.log(obj)
  if (data) {
    await users.findByIdAndUpdate(obj.author, {
      $push: { articles: data._id },
    })
    return data
  } else {
    throw new ValidationError('Incorrect payload')
  }
}

export const find = async () => {
  let data = await articles.find().populate({
    path: 'author',
    select: 'name',
  })
  if (!data.length) {
    data = {
      message: 'the database does not contain articles',
    }
  }
  return data
}

export const findById = async (id) => {
  const data = await articles.findById(id).populate({
    path: 'author',
    select: 'name',
  })
  if (data) {
    return data
  } else {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
}

export const findByIdAndUpdate = async (id, obj) => {
  const data = await articles.findByIdAndUpdate(id, { check: false })
  if (data) {
    const data = await articles.findByIdAndUpdate(id, obj, { new: true })
    return data
  } else {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
}

export const findByIdAndDelete = async (id) => {
  const data = await articles.findByIdAndDelete(id)
  if (data) {
    await users.findByIdAndUpdate(data.author, {
      $pull: { articles: data._id },
    })
  } else {
    throw new NotFoundError(`Article not found by id ${id}`)
  }
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
