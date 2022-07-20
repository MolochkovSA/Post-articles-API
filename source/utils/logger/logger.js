// Core
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const logFormat = printf(({ message, timestamp }) => {
  return `${timestamp} method: ${message.method} URL: ${message.url}
  ${JSON.stringify(message.payload)}`
})

export const logger = createLogger({
  level: 'debug',
  format: combine(timestamp(), logFormat),
  transports: [new transports.Console()],
})
