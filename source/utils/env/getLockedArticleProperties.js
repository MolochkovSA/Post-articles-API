export const getLockedArticleProperties = () => {
  const LOCKED_ARTICLES_PROPERTIES = process.env.LOCKED_ARTICLES_PROPERTIES
  return LOCKED_ARTICLES_PROPERTIES.split(', ')
}
