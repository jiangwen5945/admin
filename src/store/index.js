import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
Vue.use(Vuex)

// 创建vuex实例
export default new Vuex.Store({
  state: {
    theme: 'dark', // 主题
  },
  mutations: {
    changeTheme(state){
      console.log('changeTheme');
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      document.getElementsByTagName('body')[0].className = state.theme
    }
  },
  modules: {
    tab
  }
})