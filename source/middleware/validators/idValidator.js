// Core
import mongoose from 'mongoose'

// Instruments
import { ValidationError } from '../../utils/index.js'

export const idValidator = async (req, res, next) => {
  const id = req.params['userId'] || req.params['articleId'] // да, плохое решение, потом разберусь!!!!!!!!!!!
  if (mongoose.Types.ObjectId.isValid(id)) {
    return next()
  } else {
    throw new ValidationError(`Id ${id} is invalid`, 404)
  }
}
