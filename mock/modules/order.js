import Mock from 'mockjs'
// 拓展mockjs
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189', '176', '177'] // 自己写前缀哈return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()}
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})
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
    'id': '@id',  // 订单id
    'createTime': '@datetime', // 创建时间
    'payTime': '@datetime',// 支付时间
    'consignTime': '@datetime', // 发货时间
    'endTime': '@datetime', // 结束时间
    'closeTime': '@datetime',  // 取消时间
    'evaluationTime': '@datetime', // 评价时间
    'payType|1': ['1', '2', '3', '4'], // 支付类型
    'orderState|1': ['0', '1', '2', '3', '4'], // 订单状态
    'postFee|8-12': 8, // 邮费
    'payMoney|50-200': 50, // 支付金额
    'totalMoney|50-200': 50, // 商品总价
    'receiverContact': "@cname", // 收货人
    'receiverMobile': "@phone", // 收货人电话
    'receiverAddress': '@county(true)',// 收货人地址
    'provinceCode': '', // 省份码
    'cityCode': '', // 城市码
    'countyCode': '', // 地区码
    'skus': [] // 商品列表skus
  }]
})

export default {
  getOrderList: params => {
    const { id, page = 1, limit = 10 } = param2Obj(params.url)
    const classList = mockList.list.filter(e => {
      if (id && e.id.indexOf(id) === -1) return false
      return true
    })
    const pageList = classList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      message: "success",
      result: {
        list: pageList,
        count: classList.length
      }
    }
  },

  createOrder: params => {
    const { orderState, payMoney, payType, receiverContact, receiverMobile, receiverAddress } = JSON.parse(params.body)
    mockList.list.unshift({
      id: Mock.mock('@id'),
      createTime: Mock.mock('@now'),
      orderState,
      payMoney,
      payType,
      receiverContact,
      receiverMobile,
      receiverAddress
    })
    return {
      code: 200,
      message: 'success',
      result: {
        message: '添加成功'
      }
    }
  },

  deleteOrder: (params) => {
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

  updateOrder: (params) => {
    const { id, orderState, payMoney, payType, receiverContact, receiverMobile, receiverAddress } = JSON.parse(params.body)
    mockList.list.some(e => {
      if (e.id === id) {
        e.orderState = orderState
        e.payMoney = payMoney
        e.payType = payType
        e.receiverContact = receiverContact
        e.receiverMobile = receiverMobile
        e.receiverAddress = receiverAddress
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