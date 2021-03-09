<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar/>
    <h2>{{iid}}</h2>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
  },
  data(){
    return{
      iid:null, // 商品id
    }
  },
  created(){
    this.iid = this.$route.params.iid;  // 动态路由方式
    // this.iid = this.$route.query.iid;  // query方式
  },
}
</script>

<style scoped>

</style>