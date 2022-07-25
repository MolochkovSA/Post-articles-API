// Core
import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
  payload: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
    minlength: 30,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
})

export const auth = mongoose.model('Auth', authSchema)
