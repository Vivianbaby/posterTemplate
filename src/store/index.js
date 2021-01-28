import { login, logout} from '@/api/system/login'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: {}
}

const mutations = {
    SET_USERINF: (state, info) => {
     state.userInfo = info
    }
}

const actions = {
    // 登录
    Login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(res => {
                sessionStorage.setItem('userInfo', JSON.stringify(res.datas))
                commit('SET_USERINF', res.datas)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 登录
    Logout({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            logout(userInfo).then(() => {
                sessionStorage.setItem('userInfo', '');
                commit('SET_USERINF', {});
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}


const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})

export default store
