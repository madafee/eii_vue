/* eslint-disable */
import { login, usersSwap } from '@/api/login'
import { getToken, getUserdata } from '@/utils/auth' // 验权
const user = {
  state: {
    token: '',
    authorization: '',
    roles: [],
    roleslist: [],
    userid: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AUTHORIZATION: (state, authorization) => {
      state.authorization = authorization
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLESLIST: (state, roleslist) => {
      state.roleslist = roleslist
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.login.trim(), userInfo.password).then(response => {
          // 将数据存入localStorage
          var roleslist = []
          //var auths = [1,2,3]
          roleslist.push(response.data[0].role_id)
          window.sessionStorage.setItem('Admin-Token', response.token)
          window.sessionStorage.setItem('Admin-Authorization', response.authorization)
          window.sessionStorage.setItem('Admin-Data', JSON.stringify(response.data))
          window.sessionStorage.setItem('Admin-Time', Date.parse(new Date()))
          commit('SET_TOKEN', response.token)
          commit('SET_AUTHORIZATION', response.authorization)
          commit('SET_USERID', response.data[0].id)
          commit('SET_ROLESLIST', response.data[0].auths)
          // commit('SET_ROLESLIST', response.data[0].auths) // 用户页面按钮级别判断
          // commit('SET_USERDATA', response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        window.sessionStorage.clear()
        resolve()
      })
    },

    // swap换取token
    UsersSwap({ commit, state }) {
      return new Promise((resolve, reject) => {
        var token = getToken()
        usersSwap(token).then(response => {
          window.sessionStorage.setItem('Admin-Time', Date.parse(new Date()))
          window.sessionStorage.setItem('Admin-Authorization', response.authorization)
          commit('SET_AUTHORIZATION', response.authorization)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }, userid) {
      return new Promise((resolve, reject) => {
        // var rolesBox = []
        // rolesBox.push(getUserdata()[0].auths)
        //var auths = [1,2,3]
        commit('SET_ROLES', getUserdata()[0].auths)
        // commit('SET_ROLES', getUserdata()[0].auths)
        resolve(getUserdata())
      })
    }
  }
}

export default user
