// Instruments
import { AuthorizeError } from './index.js'

export const checkLockedProperties = (req, properties) => {
  properties.forEach((prop) => {
    if ((prop, req.body.hasOwnProperty(prop))) {
      try {
        if (!req.locals.isAdmin) {
          throw new AuthorizeError(`Property ${prop} is locked`, 403)
        }
      } catch {
        throw new AuthorizeError(`Property ${prop} is locked`, 403)
      }
    }
  })
}
