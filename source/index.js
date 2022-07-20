// Core
import dg from 'debug'
import { app } from './server.js'

// Instruments
import { getPort } from './utils/index.js'

// DB
import { connection } from './db/index.js'

const PORT = getPort()
const debugServer = dg('server:main')

connection
  .then(() => {
    app.listen(PORT, () => {
      debugServer(`Server API is up on port ${PORT}`)
    })
  })
  .catch((error) => debugServer(`Error start server API: ${error.message}`))
