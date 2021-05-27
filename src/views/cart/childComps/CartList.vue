<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- 购物车列表 -->
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :item-info="item"
        />
    </scroll>
  </div>
</template>

<script>
// 公共组件
import Scroll from 'components/common/scroll/Scroll'
// 子组件
import CartListItem from './CartListItem'
// 方法
import { mapGetters } from 'vuex'

export default {
  name:'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters([ 'cartList' ]),
  },
  // 当前路由出于活跃状态时（进来）调用
  activated(){
     this.$refs.scroll.refresh();
  },
}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>