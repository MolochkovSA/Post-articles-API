export const upsertUserView = (data) => {
  const userProfile = {
    id: data.id,
    name: data.name,
    sex: data.sex,
    age: data.age,
    phone: data.phone,
    email: data.email,
  }

  return userProfile
}

export const findUserView = (data) => {
  const articles = data.articles.map((item) => {
    return {
      id: item._id,
      theme: item.theme,
      check: item.check,
      created: item.created,
      modified: item.modified,
    }
  })

  const userProfile = {
    id: data.id,
    name: data.name,
    sex: data.sex,
    age: data.age,
    phone: data.phone,
    email: data.email,
    articles: articles,
  }

  return userProfile
}

export const findUsersView = (data) => {
  const usersProfiles = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      sex: item.sex,
      age: item.age,
      phone: item.phone,
      email: item.email,
    }
  })

  return usersProfiles
}
