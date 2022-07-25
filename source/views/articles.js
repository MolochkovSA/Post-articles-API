export const ArticleView = (data) => {
  const articleProfile = {
    id: data._id,
    author: { id: data.author._id, name: data.author.name },
    theme: data.theme,
    content: data.content,
    check: data.check,
    created: data.created,
    modified: data.modified,
  }

  return articleProfile
}

export const ArticlesView = (data) => {
  const articlesProfile = data.map((item) => {
    return {
      id: item._id,
      author: item.author.name,
      theme: item.theme,
      check: item.check,
      created: item.created,
      modified: item.modified,
    }
  })
  return articlesProfile
}
