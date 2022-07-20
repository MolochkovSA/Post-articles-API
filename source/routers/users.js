// Core
import express from 'express'

// Middleware
import { checkUser } from '../middleware/index.js'
import { idValidator } from '../middleware/index.js'
import { passwordToHashMiddle } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'

// Controllers
import { users } from '../controllers/index.js'
const { get, post, getById, updateById, deleteById } = users

const router = express.Router()

router.get('/', [authorize], get)
router.post('/', [passwordToHashMiddle], post)

router.get('/:userId', [authorize, idValidator], getById)
router.put(
  '/:userId',
  [authorize, idValidator, checkUser, passwordToHashMiddle],
  updateById
)
router.delete('/:userId', [authorize, idValidator, checkUser], deleteById)

export { router as users }
