// mock数据模拟
import Mock from 'mockjs'

// 商品数据列表
const goodsList = Mock.mock({
  'list|6': [{
    "name|+1": ['小笼包', '柳叶饺', '花生酱', '拌面', '带骨大排', '豆干'],
    "value|1000-5000": 1000,
    "todayBuy|1-100": 1,
    "monthBuy|300-1000": 300,
    "totalBuy|3000-10000": 3000
  }]
})

// 用户数据列表
const userList = Mock.mock({
  'list|7': [{
    "date|+1": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    "new|10-100": 10,
    "active|100-500": 100,
  }]
})

// 订单数据列表
const orderList = Mock.mock({
  "list|6": [{
    "name|+1": ['今日支付订单', '今日未支付订单', '今日收藏订单', '本月支付订单', '本月未支付订单', '本月收藏订单'],
    "value|+1": [45, 12, 6, 862, 211, 98],
    "icon|+1": ['s-claim', 's-release', 's-goods'],
    "color|+1": ['#2ec7c9', '#ffb980', '#5ab1ef']
  }]
})
// 获取往前一年的日期
const getlastYearDate = () => {
  // 当前日期年月
  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  // 往前一年的日期年月（不包含本月）
  const lastYearDate = []
  for (let i = 0; i < 12; i++) {
    month--
    if (month < 1) {
      month = 12
      year -= 1
    }
    const padMonth = month < 10 ? month.toString().padStart(2, '0') : month  // 月份补零
    lastYearDate.unshift(year + '-' + padMonth)
  }
  return lastYearDate
}
// 销量数据
const salesList = Mock.mock({
  "list|12": [
    {
      "冷冻品|500-8000": 500,
      "调味品|400-5000": 500,
      "辅料/干货|300-4000": 500
    }
  ],
  "date": getlastYearDate()
})

export default {
  getStatisticalData: () => {
    return {
      code: 200,
      message: 'success',
      result: {
        // 饼图
        pieData: goodsList.list,
        // 柱状图
        barData: userList.list,
        // 折线图
        lineData: {
          date: salesList.date,
          data: salesList.list
        },
        // 表格
        tableData: goodsList.list,
        // 统计总览
        countData: orderList.list
      }
    }
  }
}