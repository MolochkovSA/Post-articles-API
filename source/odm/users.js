// Core
import mongoose from 'mongoose'

// Instruments
import { passwordToHash } from '../utils/index.js'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Property '{PATH}' is required"],
      unique: true,
      minlength: 3,
      maxlength: 25,
      match: /^[a-zA-Z]+$/,
    },
    sex: {
      type: String,
      required: true,
      enum: {
        values: ['male', 'female'],
        message: 'hm... very interesting gender, but it is not allowed',
      },
      default: 'male',
    },
    birthDay: {
      type: Date,
      min: new Date(1900, 1, 1),
      max: [
        () => Date.now() - 18 * 365 * 24 * 60 * 60 * 1000,
        'User should be 18 years',
      ],
    },
    phone: {
      type: String,
      required: [true, "Property '{PATH}' is required"],
      unique: true,
      validate: {
        validator: (value) => {
          return /^(\+7||8)-\d{3}-\d{3}-\d{2}-\d{2}$/.test(value)
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    email: {
      type: String,
      required: [true, "Property '{PATH}' is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Property '{PATH}' is required"],
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

userSchema.pre('save', async function (next) {
  this.password = await passwordToHash(this.password)
  next()
})

export const users = mongoose.model('Users', userSchema)
