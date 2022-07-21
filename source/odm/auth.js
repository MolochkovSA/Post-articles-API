// Core
import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
    minlength: 30,
  },
})

export const auth = mongoose.model('Auth', authSchema)
