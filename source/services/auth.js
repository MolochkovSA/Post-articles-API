//Object Data Modelling (ODM)
import { auth } from '../odm/index.js'

// Instruments
import { getPayloadFromToken } from '../utils/index.js'

export const create = async (obj) => {
  const data = await auth.create(obj)
  return data
}

export const findOne = async (obj) => {
  const data = await auth.findOne(obj)
  return data
}

export const findOneAndDelete = async (token) => {
  const payload = getPayloadFromToken(token)
  const data = await auth.findOneAndDelete({ payload: payload })
  return data
}
