//Object Data Modelling (ODM)
import { users } from '../odm/index.js'

// Instruments
import { ValidationError } from '../utils/index.js'

export const create = async (obj) => {
  try {
    const data = await users.create(obj)
    delete data._doc.password
    return data
  } catch (error) {
    throw new ValidationError(error.message, 400)
  }
}

export const find = async () => {
  const data = await users
    .find()
    .populate({
      path: 'articles',
      select: '-author -content -__v',
      options: { sort: { created: 1 } },
    })
    .select('-password')
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
  return data
}

export const findByIdAndUpdate = async (id, obj) => {
  const data = await users
    .findByIdAndUpdate(id, obj, { new: true })
    .select('-password')
  return data
}

export const findByIdAndDelete = async (id) => {
  await users.findByIdAndDelete(id)
}
