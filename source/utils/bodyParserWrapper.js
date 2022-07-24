// Instruments
import { ValidationError } from './index.js'

export const bodyParserWrapper = (bodyParserMiddleware) => {
  return (req, res, next) =>
    bodyParserMiddleware(req, res, (err) => {
      if (err) {
        return next(new ValidationError(err.message))
      }
      next()
    })
}
