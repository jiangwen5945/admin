import Vue from 'vue'
import Vuex from 'vuex'
import tab from './modules/tab'
import setting from './modules/setting'
Vue.use(Vuex)

// 创建vuex实例
export default new Vuex.Store({
  modules: {
    tab,
    setting
  }
})