// Middleware
import { checkAdmin } from './index.js'

export const checkUser = async (req, res, next) => {
  if (req.locals._id === req.params['userId']) {
    return next()
  }
  checkAdmin(req, res, next)
}
