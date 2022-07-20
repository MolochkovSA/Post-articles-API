// Models
import { articles } from '../../models/index.js'

// Instruments
import { NotFoundError, AuthorizeError } from '../../utils/index.js'

export const checkAuthor = async (req, res, next) => {
  const id = req.params['articleId']
  const data = await articles.findById(id)
  if (!data) {
    throw new NotFoundError(`Id ${id} not found`, 404)
  }
  if (req.locals.isAdmin || req.locals._id === data.author.toString()) {
    return next()
  }
  throw new AuthorizeError(
    'That may be, but you have no right to access it',
    403
  )
}
