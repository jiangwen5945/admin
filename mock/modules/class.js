import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

// 模拟数据
const mockList = Mock.mock({
  "list|4": [{
    'classId|+1': 100,
    'className|+1': ['市场部', '技术部', '仓储部', '财务部'],
    'employeesCount|10-100': 10,
    'level': '1'
  }]
})

export default {
  getClassList: params => {
    const { name, page = 1, limit = 10 } = param2Obj(params.url)
    const classList = mockList.list.filter(e => {
      if (name && e.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = classList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    console.log('pageList', pageList);
    return {
      code: 200,
      message: "success",
      result: {
        list: pageList,
        count: classList.length
      }
    }
  },

  createClass: params => {
    const { className, employeesCount, level } = JSON.parse(params.body)
    mockList.list.unshift({
      classId: mockList.list[mockList.list.length - 1].classId + 1,
      className,
      employeesCount,
      level
    })
    return {
      code: 200,
      message: 'success',
      result: {
        message: '添加成功'
      }
    }
  },
   
  deleteClass: (params) => {
    console.log('del', params);
    const { classId } = JSON.parse(params.body)
    if (!classId) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      mockList.list = mockList.list.filter(e => e.classId !== classId)
      return {
        code: 200,
        message: '删除成功',
        result: {
          message: '删除成功'
        }
      }
    }
  },

  updateClass: (params) => {
    const { classId, className, employeesCount, level } = JSON.parse(params.body)
    console.log(classId, className, employeesCount, level);
    mockList.list.some(e => {
      if (e.classId === classId) {
        e.className = className
        e.employeesCount = employeesCount
        e.level = level
        return true
      }
    })
    return {
      code: 200,
      result: {
        message: '编辑成功'
      }
    }
  }
}