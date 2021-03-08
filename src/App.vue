<template>
  <div id="app">
    <!-- keep-alive保存路由当前状态，不随便销毁。router-view是将路由内容显示出来 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- 底部导航栏 -->
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar,
    }
  }
</script>

<style>
  @import 'assets/css/base.css'
</style>
