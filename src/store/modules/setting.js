const state = {
  theme: 'dark',
  isFullScreen: false
}

const mutations = {
  changeTheme: (state, value) => {
    state.theme = value
    localStorage.setItem('theme', state.theme)
    document.getElementById("app").setAttribute("class", 'custom-' + state.theme);
  },
  setFullScreen(state) {
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
}

export default {
  namespaced: true,
  state,
  mutations
}