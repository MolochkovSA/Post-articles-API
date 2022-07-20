export class AuthorizeError extends Error {
  constructor(message, statusCode = 403) {
    super(message)

    if (typeof statusCode !== 'number') {
      throw new Error('can not construct AuthorizeError due to arguments error')
    }

    if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode)) {
      throw new Error(
        'statusCode in AuthorizeError should be a number in range from 100 to 599'
      )
    }
    this.name = 'AuthorizeError'
    this.statusCode = statusCode
    Error.captureStackTrace(this, AuthorizeError)
  }
}
