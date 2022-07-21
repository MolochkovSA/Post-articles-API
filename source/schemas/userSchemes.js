// Core
import Joi from 'joi'

export const createUserSchema = Joi.object({
  name: Joi.string().required().trim().alphanum().min(3).max(25),
  sex: Joi.string().required().trim().valid('male', 'female'),
  birthDay: Joi.date()
    .min(new Date(1900, 1, 1))
    .max((() => Date.now())() - 18 * 365 * 24 * 60 * 60 * 1000),
  phone: Joi.string()
    .required()
    .trim()
    .pattern(new RegExp(/^(\+7||8)-\d{3}-\d{3}-\d{2}-\d{2}$/)),
  email: Joi.string().required().trim().email(),
  password: Joi.string()
    .required()
    .trim()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/))
    .min(8),
})

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().alphanum().min(3).max(25),
  sex: Joi.string().trim().valid('male', 'female'),
  birthDay: Joi.date()
    .min(new Date(1900, 1, 1))
    .max((() => Date.now())() - 18 * 365 * 24 * 60 * 60 * 1000),
  phone: Joi.string()
    .trim()
    .pattern(new RegExp(/^(\+7||8)-\d{3}-\d{3}-\d{2}-\d{2}$/)),
  email: Joi.string().trim().email(),
  password: Joi.string()
    .trim()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/))
    .min(8),
  isAdmin: Joi.boolean(),
})
