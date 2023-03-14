import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  username: 'null',
  auth: null
}

const mutations = {
  doLogin(state, username) {
    state.auth = true
    state.username = username
  },
  doLogout(state) {
    state.auth = false
    state.username = null
  }
}

const actions = {
  doLogin({commit}, username) {
    commit('doLogin', username)
  },
  doLogout({commit}) {
    commit('doLogout')
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
