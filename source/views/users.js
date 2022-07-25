// Views
import { getArticleViews } from './index.js'

export const getUserView = (data) => {
  const userProfile = {
    id: data._id,
    name: data.name,
    sex: data.sex,
    age: data.age,
    phone: data.phone,
    email: data.email,
    articles: getArticleViews(data.articles),
  }

  return userProfile
}

export const getUserViews = (data) => {
  const usersProfiles = data.map((item) => {
    return {
      id: item._id,
      name: item.name,
      sex: item.sex,
      age: item.age,
      phone: item.phone,
      email: item.email,
    }
  })

  return usersProfiles
}
