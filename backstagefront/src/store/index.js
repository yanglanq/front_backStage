import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:sessionStorage.getItem("login")?"true":"false",
    isCollapse:false
  },
  mutations: {
    setLogin(state,info){// 设置登录状态
        state.isLogin = info;
    },
    SET_COLLAPSE(state){
      state.isCollapse=!state.isCollapse;
    }
  },
  getters:{// 获取登录状态
    getLoginInfo:state=>state.isLogin,
  },
  actions: {
  },
  modules: {
  }
})
