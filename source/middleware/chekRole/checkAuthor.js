// Models
import { articles } from '../../models/index.js'

// Middleware
import { checkAdmin } from './index.js'

export const checkAuthor = async (req, res, next) => {
  const id = req.params['articleId']
  const data = await articles.findById(id)
  if (req.locals._id === data.author._id.toString()) {
    return next()
  }
  checkAdmin(req, res, next)
}
