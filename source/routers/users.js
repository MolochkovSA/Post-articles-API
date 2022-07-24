// Core
import express from 'express'

// Middleware
import { checkUser, checkAdmin } from '../middleware/index.js'
import { idValidator, validator } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'

// Controllers
import { users } from '../controllers/index.js'

// Schemas
import { createUserSchema, updateUserSchema } from '../schemas/index.js'

const {
  get,
  post,
  getById,
  updateById,
  deleteById,
  makeAdminById,
  excludeAdminById,
} = users

const router = express.Router()

router.get('/', [authorize], get)
router.post('/', [validator(createUserSchema)], post)

router.get('/:userId', [authorize, idValidator('userId')], getById)
router.put(
  '/:userId',
  [authorize, idValidator('userId'), checkUser, validator(updateUserSchema)],
  updateById
)
router.delete(
  '/:userId',
  [authorize, idValidator('userId'), checkUser],
  deleteById
)

router.post(
  '/:userId/makeadmin',
  [authorize, idValidator('userId'), checkAdmin],
  makeAdminById
)
router.post(
  '/:userId/excludeadmin',
  [authorize, idValidator('userId'), checkAdmin],
  excludeAdminById
)

export { router as users }
