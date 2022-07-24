//Object Data Modelling (ODM)
import { auth } from '../odm/index.js'

export const create = async (obj) => {
  const data = await auth.create(obj)
  return data
}

export const findOne = async (obj) => {
  const data = await auth.findOne(obj)
  return data
}

export const findOneAndDelete = async (obj) => {
  const data = await auth.findOneAndDelete(obj)
  return data
}
