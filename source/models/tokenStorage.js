//Object Data Modelling (ODM)
import { tokenStorage } from '../odm/index.js'

export const create = async (obj) => {
  const data = await tokenStorage.create(obj)
  return data
}

export const findOne = async (obj) => {
  const data = await tokenStorage.findOne(obj)
  return data
}

export const findOneAndDelete = async (obj) => {
  const data = await tokenStorage.findOneAndDelete(obj)
  return data
}
