import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
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

let List = []
const count = 200
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      userName: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      nickName: Mock.Random.name(),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
      roles: Mock.Random.shuffle(['普通用户', '客服', '仓管', '运营', '管理员'],1,3)
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 userName, page, limt; userName可以不填, page,limit有默认值。
   * @param userName, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    const { userName, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(user => {
      if (userName && user.userName.indexOf(userName) === -1 && user.addr.indexOf(userName) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      message: 'success',
      result: {
        count: mockList.length,
        list: pageList
      }
    }
  },
  /**
   * 增加用户
   * @param userName, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    const { userName,nickName, addr, birth, sex,roles } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      userName,
      nickName,
      addr,
      birth,
      sex,
      roles
    })
    return {
      code: 200,
      result: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功',
        result: {
          message: '删除成功'
        }
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      message: '批量删除成功',
      result: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, userName, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, userName, addr, age, birth, sex, roles } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.userName = userName
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        u.roles = roles
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