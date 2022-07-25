import rateLimit from 'express-rate-limit'

export const createAuthLimiter = (interval) =>
  rateLimit({
    windowMs: interval, // ${interval} milliseconds
    max: 1, // Limit each IP to 1 create authentication request (here, per ${interval} seconds)
    message: {
      message: `Too many authentications created from this IP, please try again after an ${
        interval / 1000
      } seconds`,
    },
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
