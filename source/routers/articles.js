// Core
import express from 'express'

// Middleware
import { checkAuthor } from '../middleware/chekRole/index.js'
import { idValidator } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'

// Controllers
import { articles } from '../controllers/index.js'
const { get, post, getById, updateById, deleteById } = articles

const router = express.Router()

router.get('/', get)
router.post('/', [authorize], post)

router.get('/:articleId', [idValidator], getById)
router.put('/:articleId', [authorize, idValidator, checkAuthor], updateById)
router.delete('/:articleId', [authorize, idValidator, checkAuthor], deleteById)

export { router as articles }
