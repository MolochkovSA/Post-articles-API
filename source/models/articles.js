//Object Data Modelling (ODM)
import { articles } from '../odm/index.js'

// Instruments
import { ValidationError } from '../utils/index.js'

export const create = async (obj) => {
  try {
    const data = await articles.create(obj)
    return data
  } catch (error) {
    throw new ValidationError(error.message, 400)
  }
}

export const find = async () => {
  const data = await articles.find().populate({
    path: 'author',
    select: 'name',
  })
  return data
}

export const findById = async (id) => {
  const data = await articles.findById(id).populate({
    path: 'author',
    select: 'name',
  })
  return data
}

export const findByIdAndUpdate = async (id, obj) => {
  const data = await articles.findByIdAndUpdate(id, obj, { new: true })
  return data
}

export const findByIdAndDelete = async (id) => {
  const data = await articles.findByIdAndDelete(id)
  return data
}
