import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        message: 'success',
        result: {
          menu: [
            {
              path: '/home',
              name: 'HomeView',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'UserManage.vue'
            },
            {
              path: '/menu',
              name: 'menu',
              label: '菜单管理',
              icon: 'turn-off',
              url: 'MenuManage.vue'
            },
            {
              path: '/role',
              name: 'role',
              label: '角色管理',
              icon: 's-check',
              url: 'RoleManage.vue'
            },
            {
              path: '/class',
              name: 'class',
              label: '部门管理',
              icon: 's-marketing',
              url: 'ClassManage.vue'
            },
            {
              label: '商品管理',
              icon: 'box',
              children: [
                {
                  path: '/GoodsList',
                  name: 'GoodsList',
                  label: '商品列表',
                  icon: 's-order',
                  url: 'goods/GoodsList.vue'
                },
                {
                  path: '/GoodsCategory',
                  name: 'GoodsCategory',
                  label: '商品分类',
                  icon: 's-grid',
                  url: 'goods/GoodsCategory.vue'
                }
              ]
            },
            {
              path: '/order',
              name: 'order',
              label: '订单管理',
              icon: 's-claim',
              url: 'OrderManage.vue'
            }
          ],
          userInfo: {
            username: 'Admin',
            role: '超级管理员',
            avatar: 'user.jpg'
          },
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        message: 'success',
        result: {
          menu: [
            {
              path: '/home',
              name: 'HomeView',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall.vue'
            }
          ],
          userInfo: {
            username: '小小',
            role: '客服',
            avatar: 'avatar.jpg',
          },
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        message: 'error',
        result: {
          message: '密码错误'
        }
      }
    }
  }
}