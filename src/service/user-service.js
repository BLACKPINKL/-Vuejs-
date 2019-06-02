import { httpPost } from 'utils/request'
export const login = (userInfo) => {
  return httpPost({
    url: '/manage/user/login.do',
    data: userInfo
  })
}

export const logout = ()=> {
  return httpPost({
    url: '/user/logout.do',
    data: ''
  })
}
export const checkLogin = (userInfo) => {
  let result = {
    status: false,
    meg: ''
  }
  if (!userInfo.username.length) {
    result.msg = '用户名不能为空'
    return result
  }
  if (userInfo.username.length <= 2 ) {
    result.msg = '太短了~'
    return result
  }
  if (!userInfo.password.length) {
    result.msg = '密码不能为空'
    return result
  }
  if (userInfo.password.length <= 2 ) {
    result.msg = '太短了~'
    return result
  }
  result.status = true
  result.msg = '验证通过'
  return result
}
    // 获取用户列表
export const getUserList = (page) => {
  return httpPost({
    url: '/manage/user/list.do',
    data: page
  })
}
