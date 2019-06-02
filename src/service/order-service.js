import { httpPost } from 'utils/request'
export const getOrderList = (page) => {
      return httpPost({
        url: '/manage/order/list.do',
        data: page
      })
    }
export const getSearchOrder = (orderNo) => {
      return httpPost({
        url: '/manage/order/search.do',
        data: orderNo
      })
    }
export const getOrderDetail = (orderNo) => {
      return httpPost({
        url: '/manage/order/detail.do',
        data: orderNo
      })
    }
