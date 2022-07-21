// Core
import express from 'express'

// Middleware
import { checkAuthor } from '../middleware/chekRole/index.js'
import { idValidator, validator } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'

// Controllers
import { articles } from '../controllers/index.js'
const { get, post, getById, updateById, deleteById } = articles

// Schemas
import { createArticleSchema, updateArticleSchema } from '../schemas/index.js'

const router = express.Router()

router.get('/', get)
router.post('/', [authorize, validator(createArticleSchema)], post)

router.get('/:articleId', [idValidator], getById)
router.put(
  '/:articleId',
  [authorize, idValidator, checkAuthor, validator(updateArticleSchema)],
  updateById
)
router.delete('/:articleId', [authorize, idValidator, checkAuthor], deleteById)

export { router as articles }
