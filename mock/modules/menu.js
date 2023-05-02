import Mock from 'mockjs'

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
  "list|12": [{
    "id|+1000": 1000,
    "available": 1,
    "level|+1": [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    "name|+1": ['用户管理', '菜单管理', '角色管理', '部门管理', '商品管理', '商品列表', '商品分类','订单管理', '文章管理', '文章列表', '创建文章', '文件管理'],
    "icon|+1": [ 'user', 'turn-off', 's-check', 's-marketing', 'box','s-order', 's-grid', 's-claim','document', 'document-copy', 'edit-outline', 'files'],
    "roles|+1": [
      ['管理员'],
      ['管理员'],
      ['管理员'],
      ['管理员'],
      ['管理员','客服','运营'],
      ['管理员','客服','仓管']
    ]
  }]
})

export default {
  getMenuList: (params) => {
    const { name, page = 1, limit = 10 } = param2Obj(params.url)
    const menuList = mockList.list.filter(e => {
      if (name && e.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = menuList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      message: "success",
      result: {
        list: pageList,
        count: menuList.length
      }
    }
  },

  createMenu: (params) => {
    const { available, level, name, roles } = JSON.parse(params.body)
    mockList.list.unshift({
      id: mockList.list[mockList.list.length - 1].id + 1000,
      available,
      level,
      name,
      roles
    })
    return {
      code: 200,
      message: 'success',
      result: null
    }
  },

  deleteMenu: (params) => {
    const { id } = JSON.parse(params.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      mockList.list = mockList.list.filter(e => e.id !== id)
      return {
        code: 200,
        message: '删除成功',
        result: {
          message: '删除成功'
        }
      }
    }

  },

  updateMenu: (params) => { 
    const { id, available, level, name, roles, icon } = JSON.parse(params.body)
    mockList.list.forEach(e => {
      if (e.id === id) {
        e.available = available
        e.level = level
        e.name = name
        e.roles = roles
        e.icon = icon
        return true
      }
    });
    return {
      code: 200,
      result: {
        message: '编辑成功'
      }
    }
  },
}