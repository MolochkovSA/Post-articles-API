// Core
import express from 'express'

// Middleware
import { authenticate } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'
import { createAuthLimiter } from '../middleware/index.js'

// Controllers
import { login, logout } from '../controllers/index.js'

const router = express.Router()

router.post('/login', [createAuthLimiter(5 * 1000), authenticate], login)
router.post('/logout', [authorize], logout)

export { router as auth }
