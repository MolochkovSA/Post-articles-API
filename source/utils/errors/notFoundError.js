export class NotFoundError extends Error {
  constructor(message, statusCode = 404) {
    super(message)

    if (typeof statusCode !== 'number') {
      throw new Error('can not construct NotFoundError due to arguments error')
    }

    if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
      throw new Error(
        'statusCode in NotFoundError should be a number in range from 100 to 599'
      )
    }
    this.name = 'NotFoundError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, NotFoundError)
  }
}
