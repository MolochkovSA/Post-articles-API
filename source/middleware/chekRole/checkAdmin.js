// Instruments
import { AuthorizeError } from '../../utils/index.js'

export const checkAdmin = async (req, res, next) => {
  if (req.locals.isAdmin) {
    return next()
  }
  next(new AuthorizeError('That may be, but you have no right to access it'))
}
