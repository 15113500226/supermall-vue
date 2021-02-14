<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  props:{
    goods:{
      type: Array,
      default(){
        return []
      },
    },
  },
  components:{
    GoodsListItem,
  },
}
</script>

<style>
.goods{
  display: flex;
  /* 均等分 */
  justify-content: space-around;
  /* 超出换行 */
  flex-wrap: wrap;
  padding: 2px;
}
</style>