// Core
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const logFormat = printf(({ message, timestamp }) => {
  return `${timestamp} ${message}`
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
})

export const notFoundErrorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: 'logs/not_found_errors.log',
      level: 'error',
    }),
  ],
})

export const validationErrorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: 'logs/validation_errors.log',
      level: 'error',
    }),
  ],
})

export const authorizeErrorLogger = createLogger({
  level: 'error',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.File({
      filename: 'logs/authorize_errors.log',
      level: 'error',
    }),
  ],
})
