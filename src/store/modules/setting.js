const state = {
  theme: 'dark'
}

const mutations = {
  changeTheme: (state, value) => {
    state.theme = value
    localStorage.setItem('theme', state.theme)
    document.getElementById("app").setAttribute("class", 'custom-' + state.theme);
  }
}

export default {
  namespaced: true,
  state,
  mutations
}