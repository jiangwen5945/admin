import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock'
import '../src/assets/css/global.less'

Vue.config.productionTip = false
Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenuToRouter',router)
  }
}).$mount('#app')
