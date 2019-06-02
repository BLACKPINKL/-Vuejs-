import { httpPost } from 'utils/request'
export const getCategoryList = (categoryId) => {
      return httpPost({
        url: '/manage/category/get_category.do',
        method: 'post',
        data: categoryId
      })
    }
export const setName = (categoryInfo) => {
      return httpPost({
        url: '/manage/category/set_category_name.do',
        method: 'post',
        data: categoryInfo
      })
    }
export const addCate = (categoryInfo) => {
      return httpPost({
        url: '/manage/category/add_category.do',
        method: 'post',
        data: categoryInfo
      })
    }
export const vaildateAddCate = (categoryInfo) => {
      let result = {
        status: false,
        msg: ''
      }
      if (!categoryInfo.parentId) {
        result.msg = '请选择分类'
        return result
      }
      if (!categoryInfo.categoryName) {
        result.msg = '请填写品类名称'
        return result
      }
      result.status = true
      result.msg = '验证通过'
      return result
    }
