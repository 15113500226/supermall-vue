import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
    /* 
     * 添加到购物车
     */
    addCart(context, payload) {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid); // 如果有返回该对象
        if (oldProduct) {
            context.commit(ADD_COUNTER, oldProduct); // oldProduct.count += 1;
        } else {
            payload.count = 1; // 第一次肯定是没有的，就给payload添加count属性
            context.commit(ADD_TO_CART, payload); // context.state.cartList.push(payload);
        }
    },
}