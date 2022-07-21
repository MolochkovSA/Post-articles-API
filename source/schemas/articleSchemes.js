// Core
import Joi from 'joi'

export const createArticleSchema = Joi.object({
  author: Joi.string().required().trim().alphanum(),
  theme: Joi.string().required().trim().min(3).max(100),
  content: Joi.string().trim(),
})

export const updateArticleSchema = Joi.object({
  author: Joi.string().trim().alphanum(),
  theme: Joi.string().trim().min(3).max(100),
  content: Joi.string().trim(),
})
