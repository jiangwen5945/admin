import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
Vue.use(VueRouter)

// 1. 定义组件
import Main from '../view/Main.vue'
// import HomeView from '../view/HomeView.vue'
// import Mall from '../view/Mall.vue'
// import UserManage from '../view/UserManage.vue'
// import PageOne from '../view/PageOne.vue'
// import PageTwo from '../view/PageTwo.vue'
import Login from '../view/Login.vue'
// import Error from '../view/Error.vue'
// 2. 定义路由
const routes = [
  {
    path: '/',
    component: Main,
    name: 'main',
    redirect: '/home',
    children: [
      // {path:'home', name:'home', component: Home},
      // {path:'mall', name:'mall', component: Mall},
      // {path:'user', name:'user', component: UserManage},
      // {path:'page1', name:'page1', component: PageOne},
      // {path:'page2', name:'page2', component: PageTwo},
      // {  
      //   path: '*',
      //   component: ()=>import('@/view/Error.vue'),
      //   name: 'ErrorView'
      // }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'LoginView'
  },
  // {
  //   path: '*',
  //   component: Error,
  //   name: 'ErrorView'
  // }
]
// 3. 创建实例
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token && to.name !== 'LoginView') {
    next({ name: 'LoginView' })
  } else if (token && to.name === 'LoginView') {
    next({ name: 'HomeView' })
  }
  next()
})



export default router