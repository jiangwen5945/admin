import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false, // 控制菜单展开或关闭
     // 面包屑数组
    navList: [{
      path: '/',
      name: 'HomeView',
      label: '首页',
      icon: 's-home',
      url: 'Home/Home'
    }],
    crumbsList: [{
      path: '/',
      name: 'HomeView',
      label: '首页'
    }],
    menuArray: [],
    userInfo: ''
  },
  mutations: {
    
    updateCrumbs(state, item){
      const crumb = {
        path: item.path,
        name: item.name,
        label: item.query.label
      } 
      if (item.name !== 'HomeView') {
        state.crumbsList.splice(1,1,crumb)
      }
    },
    // 折叠侧边菜单栏
    handleCollapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    updateNavList(state, item) {
      // 仅在当前位置不为首页且面包屑列表中不存在时添加更新数据
      if (item.name !== 'home' && state.navList.findIndex(e => e.name === item.name) === -1) {
        state.navList.push(item)
      }
    },
    closeTag(state, item) {
      const tagIndex = state.navList.findIndex(e => e.name === item.name)
      state.navList.splice(tagIndex, 1)
    },
    setUserInfo(state, val) {
      state.userInfo = val
      Cookie.set('userInfo', JSON.stringify(val))// 在cookie中缓存登录用户信息
    },
    // 设置菜单数据
    setMenuArray(state, val) {
      state.menuArray = val
      Cookie.set('menuArray', JSON.stringify(val))// 在cookie中缓存菜单列表
    },
    // 动态注册路由
    addMenuToRouter(state, router) {
      if (!Cookie.get('menuArray')) return  // 不存在menuArray缓存时直接返回false
      const menuArray = JSON.parse(Cookie.get('menuArray'))
      state.menuArray = menuArray
      // 组装动态路由的数据
      const fomatMenuArr = [] // 用来组装动态路由数据的空数组
      menuArray.forEach(el => {
        if (el.children) {
          el.children = el.children.map(item => {
            item.component = () => import(`@/view/${item.url}`)
            return item
          })
          fomatMenuArr.push(...el.children)

        } else {
          el.component = () => import(`@/view/${el.url}`)
          fomatMenuArr.push(el)
        }
      });
      // 最后添加404页面路由
      fomatMenuArr.push({
        path: '*',
        name: 'ErrorView',
        component: ()=>import('@/view/Error.vue')
      })
      // 路由动态添加
      fomatMenuArr.forEach(item => {
        router.addRoute('main', item)
      })
    }
  }
}