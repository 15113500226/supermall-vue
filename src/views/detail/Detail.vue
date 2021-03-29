<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar/>
    <!-- 轮播图 -->
    <detail-swiper :top-images="topImages"/>
    <h2>{{iid}}</h2>
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
// 发送网络请求
import { getDetail } from 'network/detail.js'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
  },
  data(){
    return{
      iid:null, // 商品id
      topImages:[], // 轮播图数据
    }
  },
  created(){
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;  // 动态路由方式
    // this.iid = this.$route.query.iid;  // query方式

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // <1>.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;

      console.log(res);
    })
  },
}
</script>

<style scoped>

</style>