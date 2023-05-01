const state = {
  theme: 'dark',
  isFullScreen: false,
  isLockScreen: false
}

const mutations = {
  changeTheme: (state, value) => {
    state.theme = value
    localStorage.setItem('theme', state.theme)
    document.getElementById("app").setAttribute("class", 'custom-' + state.theme);
  },
  changeFullScreen(state) {
    state.isFullScreen = !state.isFullScreen
    if (!state.isFullScreen) {
      document.exitFullScreen && document.exitFullscreen();
      //兼容火狐
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      //兼容谷歌等
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      //兼容IE
      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (document.documentElement.RequestFullScreen) {
        document.documentElement.RequestFullScreen();
      }
      //兼容火狐
      if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
      if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      }
      //兼容IE,只能写msRequestFullscreen
      if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    }
    
  },
  changeLockScreen(state,isLock){
    state.isLockScreen = isLock
  }
}

const actions = {
  setLockScreen(ctx,isLock){
    ctx.commit('changeLockScreen', isLock)
  },
  setFullScreen(ctx){
    ctx.commit('changeFullScreen')
  },
  setTheme(ctx, value){
    const reverseTheme = value === 'dark' ? 'light' : 'dark'
    ctx.commit('changeTheme', reverseTheme)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}