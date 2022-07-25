//Object Data Modelling (ODM)
import { users } from '../odm/index.js'

// Instruments
import { ValidationError, NotFoundError } from '../utils/index.js'

export const create = async (obj) => {
  const data = await users.create(obj)
  if (data) {
    const userObject = data.toObject()
    delete userObject.password
    return userObject
  } else {
    throw new ValidationError('Incorrect payload')
  }
}

export const find = async () => {
  let data = await users
    .find()
    .populate({
      path: 'articles',
      select: '-author -content -__v',
      options: { sort: { created: 1 } },
    })
    .select('-password')
  if (!data.length) {
    data = { message: 'the database does not contain users' }
  }
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
      select: '-author -content -__v',
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
