<template>
  <div>
    详情页
    <h2>{{iid}}</h2>
  </div>
</template>

<script>
export default {
  name:'Detail',
  data(){
    return{
      iid:null,
    }
  },
  created(){
    this.iid = this.$route.params.iid;  // 动态路由方式
    // this.iid = this.$route.query.iid;  // query方式
  },
}
</script>

<style>

</style>