// Core
import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
  userId: {
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
    expires: 300,
  },
})

export const auth = mongoose.model('Auth', authSchema)
