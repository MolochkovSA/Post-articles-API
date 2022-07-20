// Core
import mongoose from 'mongoose'

const tokenStorageSchema = new mongoose.Schema({
  token: {
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

export const tokenStorage = mongoose.model('TokenStorage', tokenStorageSchema)
