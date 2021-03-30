<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"/>

    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 商品信息的展示 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息的展示 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <h2>{{iid}}</h2>
    </scroll>
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
// 公共组件
import Scroll from 'components/common/scroll/Scroll'
// 发送网络请求
import { getDetail, GoodInfo, Shop } from 'network/detail.js'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
  },
  data(){
    return{
      iid:null, // 商品id
      topImages:[], // 轮播图数据
      goods:{}, // 存放Detail商品详细数据
      shop:{},  // 存放店铺信息
      detailInfo:{}, // 存放商品详细信息
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

      // <4>.获取商品详细信息
      this.detailInfo = data.detailInfo;
      console.log(this.detailInfo);
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh();
    },
  },
}
</script>

<style scoped>
/* 隐藏tabbar组件 */
  #detail{
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
  }

  /* 将导航栏显示（方法一） */
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index: 9999;
  }

/* 设置滚动高度 */
  .content{
    height: calc(100% - 44px);
    /* 将导航栏显示（方法二） */
    /* overflow: hidden; */
  }
</style>