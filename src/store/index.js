import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    cartList: [], // 存储购物车商品信息
}

// 创建store对象
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters: {},
    modules: {}
})

//挂载到vue实例上
export default store