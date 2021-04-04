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
      <!-- 参数信息 -->
      <detail-param-info :param-info="paramInfo"/>
      <!-- 评论信息 -->
      <detail-comment-info :commentInfo="commentInfo"/>
      <!-- 推荐信息 -->
      <goods-list :goods="recommends"/>
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
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
// 公共组件
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// 发送网络请求
import { getDetail, GoodInfo, Shop, GoodsParam, getRecommend } from 'network/detail.js'


export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  data(){
    return{
      iid:null, // 商品id
      topImages:[], // 轮播图数据
      goods:{}, // 存放Detail商品详细数据
      shop:{},  // 存放店铺信息
      detailInfo:{}, // 存放商品详细信息
      paramInfo:{}, // 存放参数信息
      commentInfo:{}, // 存放评论信息
      recommends:[],  // 存放推荐数据的信息
    }
  },
  created(){
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;  // 动态路由方式
    // this.iid = this.$route.query.iid;  // query方式

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;

      // <1>.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // <2>.获取商品信息
      this.goods = new GoodInfo(data.itemInfo, data.columns, data.shopInfo.services);

      // <3>.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // <4>.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // <5>.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // console.log(this.paramInfo);

      // <6>.获取评论信息(有些商品无评论信息，判断该商品是否有评论信息再做展示)
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }
    })

    // 3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
      console.log(this.recommends);
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