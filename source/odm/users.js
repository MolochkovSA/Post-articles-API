// Core
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Property "name" is required'],
      unique: true,
      minlength: 3,
      maxlength: 25,
      match: /^[a-zA-Z]+$/,
    },
    sex: {
      type: String,
      required: true,
      enum: ['male', 'female'],
      default: 'male',
    },
    birthDay: {
      type: Date,
      min: new Date(1900, 1, 1),
      max: [
        () => Date.now() - 18 * 365 * 24 * 60 * 60 * 1000,
        'user should be 18 years',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Property "sex" is required'],
      unique: [true, 'phone already exists'],
      validate: {
        validator: (value) => {
          return /^(\+7||8)-\d{3}-\d{3}-\d{2}-\d{2}$/.test(value)
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    email: {
      type: String,
      required: [true, 'Property "email" is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Property "password" is required'],
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Articles' }],
  },
  { timestamps: { createdAt: 'created', updatedAt: 'modified' } }
)

export const users = mongoose.model('Users', userSchema)
