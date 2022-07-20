// Core
import express from 'express'
import 'express-async-errors'

// Routers
import * as routers from './routers/index.js'

// Instruments
import { logger } from './utils/index.js'
import {
  errorLogger,
  validationErrorLogger,
  notFoundErrorLogger,
  authorizeErrorLogger,
} from './utils/index.js'
import { NotFoundError } from './utils/index.js'
import { createAdmin } from './utils/index.js'

// Create admin
createAdmin()

const app = express()
app.use(express.json())

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.debug({
      method: req.method,
      payload: req.body,
      url: req.url,
    })
    next()
  })
}

// Routers
app.use('/auth', routers.auth)
app.use('/users', routers.users)
app.use('/articles', routers.articles)

// NotFoundHandler
app.use('*', (req, res, next) => {
  throw new NotFoundError(`Page ${req.baseUrl} not found`, 404)
})

// Errorhandler
app.use((error, req, res, next) => {
  switch (error.name) {
    case 'ValidationError':
      validationErrorLogger.error(
        `${req.method}: ${req.url}, ${error.message},\n ${JSON.stringify(
          req.body
        )}`
      )
      res.status(error.statusCode).json({ message: error.message })
      break
    case 'NotFoundError':
      notFoundErrorLogger.error(`${req.method}: ${req.url}`)
      res.status(error.statusCode).json({ message: error.message })
      break
    case 'AuthorizeError':
      authorizeErrorLogger.error(
        `${req.method}: ${req.url}, ${error.message},\n ${JSON.stringify(
          req.body
        )}`
      )
      res.status(error.statusCode).json({ message: error.message })
      break
    default:
      errorLogger.error(`${error.name}:${error.message}`)
      res.status(500).json({ message: error.message })
      break
  }
})

export { app }
