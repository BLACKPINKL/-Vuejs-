import Cookie from 'js-cookie'
export const uTgetUserInfo = (key) => {
  let data = Cookie.get(key)
  if (!data) {
    return null
  }
  return JSON.parse(data)
}

export const uTsetUserInfo = (key, value) => {
  return Cookie.set(key, value)
}

export const uTremoveUserInfo = (key) => {
  return Cookie.remove(key)
}
