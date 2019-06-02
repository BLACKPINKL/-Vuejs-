import { httpPost } from 'utils/request'

export const getBaseCount = () => {
  return httpPost({
    url: '/manage/statistic/base_count.do',
    data: ''
  })
}
