// Core
import express from 'express'

// Middleware
import { authenticate } from '../middleware/index.js'
import { authorize } from '../middleware/index.js'

// Controllers
import { login, logout } from '../controllers/index.js'

const router = express.Router()

router.post('/login', [authenticate], login)
router.post('/logout', [authorize], logout)

export { router as auth }
