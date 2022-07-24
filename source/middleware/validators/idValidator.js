// Core
import mongoose from 'mongoose'

// Instruments
import { ValidationError } from '../../utils/index.js'

export const idValidator = (param) => async (req, res, next) => {
  const id = req.params[param]
  if (mongoose.Types.ObjectId.isValid(id)) {
    return next()
  } else {
    throw new ValidationError(`Id ${id} is invalid`)
  }
}
