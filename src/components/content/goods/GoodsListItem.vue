<template>
  <div class="goods-item" @click="itemClick">
    <!-- <a :href="goodsItem.link"> -->
      <!-- 商品图片 -->
      <img :src="showImages" alt="" @load="imageLoad">
      <div class="goods-info">
        <!-- 标题 -->
        <div class="title"><p>{{goodsItem.title}}</p></div>
        <!-- 价格 -->
        <span class="price">{{goodsItem.price}}</span>
        <!-- 收藏 -->
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    <!-- </a> -->
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type: Object,
      default(){
        return {}
      },
    },
  },
  computed:{
    showImages(){
      return this.goodsItem.image || this.goodsItem.show.img
    },
  },
  methods:{
    // 监听图片的加载完成
    imageLoad(){
      this.$bus.$emit('itemImageLoad'); // 事件总线——发射itemImageLoad事件
      // console.log(this.$bus);
    },
    // 监听goodListItem的点击
    itemClick(){
      // 跳转到详情页，详情页需要返回（用push，不用replace）
      this.$router.push('/detail/' + this.goodsItem.iid)
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     iid: this.goodsItem.iid
      //   }
      // });
    },
  },
}
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  text-align: center;
  /* box-sizing: border-box; */
}

.goods-item img{
  /* width: 100%; */
  width: 153.6px;
  height: 230px;
  border-radius: 5px;
}

.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info .title{
  width: 100%;
  height: 14px;
  overflow: hidden;
  margin-bottom: 3px;
}

.goods-info p{
  /* 超出隐藏、用...表示、不换行 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  
}

.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect{
  position: relative;
}

.goods-info .collect::before{
  content: '';
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
}
</style>