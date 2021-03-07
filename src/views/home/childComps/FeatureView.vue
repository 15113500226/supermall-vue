<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imageLoad">
    </a>
  </div>
</template>

<script>
export default {
  name:'FeatureView',
  methods:{
    // 监听图片加载
    imageLoad(){
      console.log('feature-view 图片加载');
    },
  },
}
</script>

<style>
  .feature img{
    width: 100%;
  }
</style>