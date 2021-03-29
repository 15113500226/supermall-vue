<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar/>
    <!-- 轮播图 -->
    <detail-swiper :top-images="topImages"/>
    <!-- 商品信息的展示 -->
    <detail-base-info :goods="goods"/>
    <!-- 店铺信息的展示 -->
    <detail-shop-info :shop="shop"/>
    <h2>{{iid}}</h2>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
// 发送网络请求
import { getDetail, GoodInfo, Shop } from 'network/detail.js'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  data(){
    return{
      iid:null, // 商品id
      topImages:[], // 轮播图数据
      goods:{}, // 存放Detail商品详细数据
      shop:{},  // 存放店铺信息
    }
  },
  created(){
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;  // 动态路由方式
    // this.iid = this.$route.query.iid;  // query方式

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;

      // <1>.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // <2>.获取商品信息
      this.goods = new GoodInfo(data.itemInfo, data.columns, data.shopInfo.services);

      // <3>.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
    })
  },
}
</script>

<style scoped>

</style>