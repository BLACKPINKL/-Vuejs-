import Path from 'path'
// 向上递归寻找指定parent组件
export const findComponentUpward = (context, componentName) => {
  let parent = context.$parent
  let parentName = parent.$options.name
  // console.log(parentName)
  while(parent && (!parentName || componentName.indexOf(parentName) < 0)) {
    parent = parent.$parent
    if(parent) parentName = parent.$options.name
  }
  return parent
}

// 向下寻找指定的所有的组件 返回一个数组
export const findComponentsDownward = (context, componentName) => {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }
    let findComponents = findComponentsDownward(child, componentName)
    return components.concat(findComponents)
  }, [])
}

// 生成随机id
export const randomId = (len) => {
  return Math.random().toString(36).substr(3, len)
}

// 路径拼接
export const resolvePath = (basePath, path) => {
  if (typeof path !== 'string' && typeof basePath !== 'string') {
    return null
  }
  return Path.resolve(basePath, path)
}

//
export const getOpenedNames = (routerList, name) => {
  let arr = []
  routerList.some(item => {
    if (item.name === name) {
      arr.push(name)
      return true
    }
    if (item.children && item.children.length) {
      let findOpenedNames = getOpenedNames(item.children, name)
      if (findOpenedNames.length) {
        arr = arr.concat(item.name, findOpenedNames)
        return true
      }
    }
  })
  return arr
}

export const typeOf = (obj) => {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    }
    return map[toString.call(obj)]
}

// 深拷贝
export const deepCopy = (data) => {
    const t = typeOf(data)
    let o

    if (t === 'array') {
        o = []
    } else if ( t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
        o.push(deepCopy(data[i]))
      }
    } else if ( t === 'object') {
      for (let i in data) {
        o[i] = deepCopy(data[i])
      }
    }
    return o
}
