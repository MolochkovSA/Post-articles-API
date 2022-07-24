// Core
import dg from 'debug'
import { app } from './server.js'

// Config
import { PORT } from './config.js'

// DB
import { connection } from './db/index.js'

const debugServer = dg('server:main')

connection
  .then(() => {
    app.listen(PORT, () => {
      debugServer(`Server API is up on port ${PORT}`)
    })
  })
  .catch((error) => debugServer(`Error start server API: ${error.message}`))
