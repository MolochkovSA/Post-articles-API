// Core
import mongoose from 'mongoose'

// Instruments
import { ValidationError } from '../utils/index.js'

const articlesSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    theme: {
      type: String,
      required: [true, "Property '{PATH}' is required"],
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    content: {
      type: String,
    },
    check: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'modified' } }
)

articlesSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new ValidationError(
        `Duplicate value error in ${JSON.stringify(error.keyValue)}`
      )
    )
  } else {
    next()
  }
})

articlesSchema.post('findOneAndUpdate', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new ValidationError(
        `Duplicate value error in ${JSON.stringify(error.keyValue)}`
      )
    )
  } else {
    next()
  }
})

export const articles = mongoose.model('Articles', articlesSchema)
