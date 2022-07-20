export class ValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message)

    if (typeof statusCode !== 'number') {
      throw new Error(
        'can not construct ValidationError due to arguments error'
      )
    }

    if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
      throw new Error(
        'statusCode in ValidationError should be a number in range from 100 to 599'
      )
    }
    this.name = 'ValidationError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, ValidationError)
  }
}
