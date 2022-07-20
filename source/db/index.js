// Core
import mongoose from 'mongoose'
import dg from 'debug'

// Instruments
import { getDBUrl } from '../utils/index.js'

const debugDB = dg('db')
const DBUrl = getDBUrl()
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export const connection = mongoose.connect(DBUrl, mongooseOptions)

connection
  .then(() => {
    debugDB('Conecting to DB')
  })
  .catch((error) => debugDB(`DB connected error: ${error.message}`))
