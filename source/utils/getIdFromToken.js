export const getIdFromToken = (token) => {
  const [header, paylod, signature] = token.split('.')
  const { _id } = JSON.parse(Buffer.from(paylod, 'base64').toString())
  return _id
}
