// Core
import mongoose from 'mongoose'

// Instruments
import { passwordToHash, ValidationError } from '../utils/index.js'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Property '{PATH}' is required"],
      unique: true,
      minlength: 3,
      maxlength: 25,
      match: /^[a-zA-Z0-9]+$/,
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
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Articles' }],
    age: {
      type: Number,
      virtual: true,
      get() {
        const ageDifMs = Date.now() - this.birthDay.getTime()
        const ageDate = new Date(ageDifMs)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      },
    },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'modified' },
    toObject: { getters: true, virtuals: true },
  }
)

userSchema.pre('save', async function (next) {
  this.password = await passwordToHash(this.password)
  next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
  const password = this._update.password
  if (password) {
    this._update.password = await passwordToHash(password)
  }
  next()
})

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new ValidationError(
        `Duplicate value error in ${JSON.stringify(error.keyValue)}`,
        400
      )
    )
  } else {
    next()
  }
})

userSchema.post('findOneAndUpdate', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new ValidationError(
        `Duplicate value error in ${JSON.stringify(error.keyValue)}`,
        400
      )
    )
  } else {
    next()
  }
})

export const users = mongoose.model('Users', userSchema)
