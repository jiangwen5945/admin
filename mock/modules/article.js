import Mock from 'mockjs'

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

// 模拟数据
const mockList = Mock.mock({
  "list|4": [{
    'id': '@id', 
    'createTime': '@datetime', 
    'author': '@name', 
    'score|1': ['1','2','3','4','5'],
    'status|0-1': 0,
    'title': '@ctitle'
  }]
})

export default {
  getArticleList: params => {
    const { id, page = 1, limit = 10 } = paramToObj(params.url)
    const articleList = mockList.list.filter(e => {
      if (id && e.id.indexOf(id) === -1) return false
      return true
    })
    const pageList = articleList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      message: "success",
      result: {
        list: pageList,
        count: articleList.length
      }
    }
  },

  createArticle: params => {
    const { author, title, status, score } = JSON.parse(params.body)
    mockList.list.unshift({
      id: mockList.list[mockList.list.length - 1].id + 1,
      author,
      title,
      status,
      score,
      createTime: Mock.mock('@now')
    })
    return {
      code: 200,
      message: 'success',
      result: {
        message: '添加成功'
      }
    }
  },

  deleteArticle: (params) => {
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

  updateArticle: (params) => {
    const { id, author, title, status, score } = JSON.parse(params.body)
    mockList.list.some(e => {
      if (e.id === id) {
        e.author = author
        e.title = title
        e.status = status
        e.score = score
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