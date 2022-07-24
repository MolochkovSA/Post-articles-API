// Core
import express from 'express'

// Middleware
import { checkAuthor, checkAdmin } from '../middleware/index.js'
import { idValidator, validator } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'

// Controllers
import { articles } from '../controllers/index.js'
const {
  get,
  post,
  getById,
  updateById,
  deleteById,
  approveById,
  unapproveById,
} = articles

// Schemas
import { createArticleSchema, updateArticleSchema } from '../schemas/index.js'

const router = express.Router()

router.get('/', get)
router.post('/', [authorize, validator(createArticleSchema)], post)

router.get('/:articleId', [idValidator('articleId')], getById)
router.put(
  '/:articleId',
  [
    authorize,
    idValidator('articleId'),
    checkAuthor,
    validator(updateArticleSchema),
  ],
  updateById
)
router.delete(
  '/:articleId',
  [authorize, idValidator('articleId'), checkAuthor],
  deleteById
)
router.post(
  '/:articleId/approve',
  [authorize, idValidator('articleId'), checkAdmin],
  approveById
)
router.post(
  '/:articleId/unapprove',
  [authorize, idValidator('articleId'), checkAdmin],
  unapproveById
)

export { router as articles }
