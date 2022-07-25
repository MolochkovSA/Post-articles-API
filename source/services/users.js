//Object Data Modelling (ODM)
import { users } from '../odm/index.js'

// Instruments
import { ValidationError, NotFoundError } from '../utils/index.js'

export const create = async (obj) => {
  const data = await users.create(obj)
  if (data) {
    return data
  } else {
    throw new ValidationError('Incorrect payload')
  }
}

export const find = async () => {
  const data = await users.find().select('-password')
  return data
}

export const findOne = async (obj) => {
  const data = await users.findOne(obj).select('email password isAdmin')
  return data
}

export const findById = async (id) => {
  const data = await users
    .findById(id)
    .populate({
      path: 'articles',
      populate: { path: 'author' },
      options: { sort: { created: 1 } },
    })
    .select('-password')
  if (data) {
    return data
  } else {
    throw new NotFoundError(`User not found by id ${id}`)
  }
}

export const findByIdAndUpdate = async (id, obj) => {
  const data = await users
    .findByIdAndUpdate(id, obj, { new: true })
    .populate({
      path: 'articles',
      populate: { path: 'author' },
      options: { sort: { created: 1 } },
    })
    .select('-password')
  if (data) {
    return data
  } else {
    throw new NotFoundError(`User not found by id ${id}`)
  }
}

export const findByIdAndDelete = async (id) => {
  const data = await users.findByIdAndDelete(id)
  if (!data) {
    throw new NotFoundError(`User not found by id ${id}`)
  }
}

export const findByIdAndMakeAdmin = async (id) => {
  const data = await users.findByIdAndUpdate(
    id,
    { isAdmin: true },
    { new: true }
  )
  if (!data || data.isAdmin !== true) {
    throw new NotFoundError(`User not found by id ${id}`)
  }
}

export const findByIdAndExcludeAdmin = async (id) => {
  const data = await users.findByIdAndUpdate(
    id,
    { isAdmin: false },
    { new: true }
  )
  if (!data || data.isAdmin !== false) {
    throw new NotFoundError(`User not found by id ${id}`)
  }
}
