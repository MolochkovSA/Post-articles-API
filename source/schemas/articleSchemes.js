// Core
import Joi from 'joi'

export const createArticleSchema = Joi.object({
  author: Joi.string(),
  theme: Joi.string().required().trim().min(3).max(100),
  content: Joi.string().trim(),
})

export const updateArticleSchema = Joi.object({
  author: Joi.string(),
  theme: Joi.string().trim().min(3).max(100),
  content: Joi.string().trim(),
})
