export const getPayloadFromToken = (token) => {
  const [header, paylod, signature] = token.split('.')
  return paylod
}
