// Core
import mongoose from 'mongoose'

const articlesSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    theme: {
      type: String,
      required: [true, 'Property "theme" is required'],
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

export const articles = mongoose.model('Articles', articlesSchema)
