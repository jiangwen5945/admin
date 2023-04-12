import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

// import "../src/styles/theme/dark.css";
// import "../src/styles/theme/light.css";
// import 'element-ui/lib/theme-chalk/index.css';
import '../src/styles/theme.scss'
import '../src/styles/global.scss'
import '../src/styles/variables.css'
import '../mock/index.js'

Vue.config.productionTip = false
Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenuToRouter',router) // 动态添加侧边栏菜单
    store.commit('setting/changeTheme',  localStorage.getItem('theme') || 'dark') // 获取用户主题
  }
}).$mount('#app')
