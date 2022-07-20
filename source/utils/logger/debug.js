export const debug = (func, req) => func(`${req.method} - ${req.originalUrl}`)
