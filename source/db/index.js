// Core
import mongoose from 'mongoose'
import dg from 'debug'

// Config
import { DB_URL } from '../config.js'

const debugDB = dg('db')
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export const connection = mongoose.connect(DB_URL, mongooseOptions)

connection
  .then(() => {
    debugDB('Conecting to DB')
  })
  .catch((error) => debugDB(`DB connected error: ${error.message}`))
