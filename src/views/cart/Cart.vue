<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-button-bar/>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navbar/NavBar'
// 子组件
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'
// 方法
import { mapGetters } from 'vuex'

export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CartButtonBar
  },
  computed: {
    ...mapGetters([ 'cartLength' ])
    // ...mapGetters({
    //   length: 'cartLength', 
    //   list: 'cartList',
    // })
  },
}
</script>

<style scoped>
.cart{
  height: 100vh;
}

/* 导航栏 */
.cart-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>