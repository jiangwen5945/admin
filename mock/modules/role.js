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

const mockList = Mock.mock({
  "list|5": [{
    "roleId|+100000": 150000,
    "available": 1,
    "roleName|+1": ["管理员", "客服", "运营", "仓管", "普通用户"],
    "authority|+1": [
      [1, 11, 12, 13, 2, 21, 22, 23, 3, 31, 32, 33, 4, 41, 42],
      [2, 21, 22, 23],
      [3, 31, 32, 33],
      [4, 41, 42],
      [4, 41]
    ]
  }]
})

export default {
  getRolesList: params => {
    const { name, page = 1, limit = 10 } = param2Obj(params.url)
    const rolesList = mockList.list.filter(e => {
      if (name && e.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = rolesList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      message: "success",
      result: {
        list: pageList,
        count: rolesList.length
      }
    }
  },

  createRole: (params) => {
    const { roleName, available, authority } = JSON.parse(params.body)
    console.log('参数', JSON.parse(params.body));
    mockList.list.unshift({
      roleId: mockList.list[mockList.list.length - 1].roleId + 100000,
      roleName,
      available,
      authority
    })
    return {
      code: 200,
      message: 'success',
      result: null
    }
  },

  deleteRole: (params) => {
    const { roleId } = JSON.parse(params.body)
    if (!roleId) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      mockList.list = mockList.list.filter(e => e.roleId !== roleId)
      return {
        code: 200,
        message: '删除成功',
        result: {
          message: '删除成功'
        }
      }
    }
  },

  updateRole: (params) => { 
    const { roleId, roleName, available, authority } = JSON.parse(params.body)
    mockList.list.some(e => {
      if (e.roleId === roleId) {
        e.roleName = roleName
        e.available = available
        e.authority = authority
        return true
      }
    })
    return {
      code: 200,
      result: {
        message: '编辑成功'
      }
    }
  },
}