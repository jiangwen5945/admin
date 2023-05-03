import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { userName, passWord } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (userName === 'admin' && passWord === 'admin123') {
      return {
        code: 200,
        message: 'success',
        result: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'HomeView.vue'
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
            },
            {
              label: '文章管理',
              icon: 'document',
              children: [
                {
                  path: '/ArticleList',
                  name: 'ArticleList',
                  label: '文章列表',
                  icon: 'document-copy',
                  url: 'article/ArticleList.vue'
                },
                {
                  path: '/CreateArticle',
                  name: 'CreateArticle',
                  label: '创建文章',
                  icon: 'edit-outline',
                  url: 'article/CreateArticle.vue'
                }
              ]
            },
            {
              path: '/files',
              name: 'files',
              label: '文件管理',
              icon: 'files',
              url: 'FilesManage.vue'
            },
            {
              path: '/member',
              name: 'member',
              label: '个人中心',
              url: 'MemberCenter.vue'
            }
          ],
          userInfo: {
            userName: 'admin',
            nickName: '无敌小钢炮',
            role: '超级管理员',
            avatar: 'https://jiangwen-admin.oss-cn-beijing.aliyuncs.com/user.jpg'
          },
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (userName === 'jiangwen' && passWord === 'jiangwen') {
      return {
        code: 200,
        message: 'success',
        result: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'HomeView.vue'
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
              path: '/member',
              name: 'member',
              label: '个人中心',
              url: 'MemberCenter.vue'
            }
          ],
          userInfo: {
            userName: 'jiangwen',
            nickName: '非洲小白脸',
            role: '客服',
            avatar: 'https://jiangwen-admin.oss-cn-beijing.aliyuncs.com/user2.jpg',
          },
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        message: '用户名或密码错误',
        result: {
          message: '用户名或密码错误'
        }
      }
    }
  },
  saveUserInfo: params => {
    console.log('params', params);
    return {
      code: 200,
      message: 'success',
      result: {
        userInfo: JSON.parse(params.body),
      }
    }
  }
}