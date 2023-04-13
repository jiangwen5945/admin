import Mock from 'mockjs'
// get请求从config.url获取参数，post从config.body中获取参数
function paramToObj(url) {
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

let mockList = []
const count = 200

// 商品列表数据
for (let i = 0; i < count; i++) {
  mockList.push(
    Mock.mock({
      id: 10000 + Mock.mock('@increment'),
      "topCategoryId|1": [35000, 36000, 37000],
      "subCategoryId|1": [],
      "fileList|1-5": [
        {
          id: Mock.mock('@id'),
          url: Mock.Random.image('60x60')
        }
      ],
      title: Mock.Random.ctitle(3, 5),
      price: Mock.Random.integer(60, 100),
      label: Mock.Random.shuffle(['新品', '热销', '推荐'], 1, 3),
      sort: Mock.Random.integer(1, 100),
      sku: Mock.Random.integer(100, 1000),
      stock: Mock.Random.integer(100, 1000),
      sales: Mock.Random.integer(100, 1000),
      verify: Mock.Random.integer(0, 1),
      available: Mock.Random.integer(0, 1),
      category:[35000,35002]
    })
  )
}

// 一级分类列表
const topCategoryList = Mock.mock({
  'list|3': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+1": [35000, 36000, 37000],
      "parentId": null,
      "childs|+1": [
        [{
          id: 35001,
          name: '小笼包1'
        }, {
          id: 35001,
          name: '小笼包2'
        }, {
          id: 35001,
          name: '小笼包3'
        }],
        [{
          id: 36001,
          name: '味精1'
        }, {
          id: 36002,
          name: '味精2'
        }, {
          id: 36003,
          name: '味精3'
        }], [{
          id: 37001,
          name: '丹参1'
        }, {
          id: 37002,
          name: '丹参2'
        }, {
          id: 37003,
          name: '丹参3'
        }]
      ],
      "name|+1": ["冻品类", "调味品", "药材/干货"],
      "level": '1',
      "productCount|100-500": 100,
      "productUnit": "件",
      "navStatus|1": [0, 1],
      "showStatus|1": [0, 1],
      "sort": 1,
      "icon": null,
      "keywords|+1": ["冻品类", "调味品", "药材/干货"],
      "description": null
    }
  ]
})

// 二级分类列表
const subCategoryList = Mock.mock({
  'list|3': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': [35001, 35002, 35003],
      'parentId': 35000,
      "childs|10": [{
        id: 10000 + Mock.mock('@increment')
      }],
      "name|+1": ['小笼包1', '小笼包2', '小笼包3'],
      "level": '2',
      "productCount|100-500": 100,
      "productUnit": "件",
      "navStatus|1": [0, 1],
      "showStatus|1": [0, 1],
      "sort": 1,
      "icon": null,
      "keywords|+1": ['小笼包1', '小笼包2', '小笼包3'],
      "description": null
    }
  ]
})

export default {
  /**
   * 商品列表
   */
  getGoodsList: (params) => {
    const { name, page = 1, limit = 20 } = paramToObj(params.url)
    const goodsList = mockList.filter(goods => {
      if (name && goods.title.indexOf(name) === -1) return false
      return true
    }).sort((a, b) => b.id - a.id)
    const pageList = goodsList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      message: 'success',
      result: {
        count: mockList.length,
        list: pageList
      }
    }
  },
  createGoods: (data) => {
    const currentGoods = JSON.parse(data.body)
    console.log('currentGoods', currentGoods);
    mockList.unshift({
      ...currentGoods,
      id: mockList[mockList.length - 1].id + 1
    })
    return {
      code: 200,
      message: 'success',
      result: null
    }
  },
  deleteGoods: (data) => {
    const { id } = JSON.parse(data.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      mockList = mockList.filter(e => e.id !== id)
      return {
        code: 200,
        message: '删除成功',
        result: null
      }
    }
  },
  updateGoods: (data) => {
    const currentGoods = JSON.parse(data.body)
    mockList.forEach(e => {
      if (e.id === currentGoods.id) {
        e = Object.assign(e, currentGoods)
      }
    })
    return {
      code: 200,
      message: '编辑成功',
      result: null
    }
  },

  /**
   * 商品分类
   */
  getGoodsCategory: (params) => {
    const { name,  level, page = 1, limit = 10 } = paramToObj(params.url)
    let allCategoryList = []
    console.log('level', level);
    switch (level) {
      case '1': allCategoryList = [...topCategoryList.list]
        break;
      case '2': allCategoryList = [...subCategoryList.list]
        break;
      default: allCategoryList = [...topCategoryList.list, ...subCategoryList.list]
        break;
    }

    const categoryList = allCategoryList.filter(e => {
      if (name && e.name.indexOf(name) === -1) return false
      return true
    })
    console.log('categoryList', categoryList);
    const pageList = categoryList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    console.log('pageList', pageList);
    return {
      code: 200,
      message: "success",
      result: {
        list: pageList,
        count: categoryList.length
      }
    }
  },

  createGoodsCategory: (data) => {
    const current = JSON.parse(data.body)
    switch (current.level) {
      case '1':
        topCategoryList.list.push({
          ...current,
          id: topCategoryList.list[topCategoryList.list.length - 1].id + 1000
        })
        break;
      case '2':
        subCategoryList.list.push({
          ...current,
          id: subCategoryList.list[subCategoryList.list.length - 1].id + 1
        })
        break;
      default: 
        return {
          code: 400,
          message: '参数不正确',
          result: null
        };
    }
    return {
      code: 200,
      message: 'success',
      result: null
    }
  },

  deleteGoodsCategory: (data) => {
    const { id, level } = JSON.parse(data.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      console.log('1',  typeof level);
      switch (level) {
        case '1':
          topCategoryList.list = topCategoryList.list.filter(e => e.id !== id)
          break;
        case '2':
          subCategoryList.list = subCategoryList.list.filter(e => e.id !== id)
          break;
        default: 
          return {
            code: 400,
            message: '参数不正确',
            result: null
          };
      }
      return {
        code: 200,
        message: '删除成功',
        result: null
      }
    }
  },

  updateGoodsCategory: (data) => {
    const current = JSON.parse(data.body)
    switch (current.level) {
      case '1':
        topCategoryList.list.forEach(e => {
          // 一级分类同级变更
          if (e.id === current.id) {
            e = Object.assign(e, current)
          }
        })
        break;
      case '2':
        console.log(2,current);
        // 二级分类同级变更
        subCategoryList.list.forEach(e => {
          console.log('二级分类变更',e.id ,current.id);
          if (e.id === current.id) {
            e = Object.assign(e, current)
          }
        })
        // 一级分类变更为二级分类

        break;
      default: 
        return {
          code: 400,
          message: '参数不正确',
          result: null
        };
    }

    return {
      code: 200,
      message: '编辑成功',
      result: null
    }
  }
}
