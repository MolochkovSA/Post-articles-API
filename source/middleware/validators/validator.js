// Instruments
import { ValidationError } from '../../utils/index.js'

export const validator = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body, {
      abortEarly: false,
    })
    req.body = value
    next()
  } catch (error) {
    const messages = error.details.map((item) => item.message)
    throw new ValidationError(messages, 400)
  }
}
