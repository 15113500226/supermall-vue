import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
    /* 
     * 添加到购物车
     */
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true;
        state.cartList.push(payload);
    },
}