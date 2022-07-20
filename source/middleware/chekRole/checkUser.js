// Models
import { users } from '../../models/index.js'

// Instruments
import { NotFoundError, AuthorizeError } from '../../utils/index.js'

export const checkUser = async (req, res, next) => {
  const id = req.params['userId']
  const data = await users.findById(id)
  if (!data) {
    throw new NotFoundError(`Id ${id} not found`, 404)
  }
  if (req.locals.isAdmin || req.locals._id === req.params['userId']) {
    return next()
  }
  throw new AuthorizeError(
    'That may be, but you have no right to access it',
    403
  )
}
