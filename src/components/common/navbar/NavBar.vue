<template>
  <div class="nav-bar">
    <!-- slot会被具体的元素替换，在slot上的属性也会被替换，所以在slot外面包个div属性 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name:'NavBar',
  }
</script>

<style>
  .nav-bar{
    display: flex;
    /* 导航栏的高度一般都是44px */
    height: 44px;
    /* 如果没有height，line-height要有内容才会撑起高度 */
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    box-sizing: border-box;
  }

  .left,.right{
    width: 60px;
  }

  .center{
    flex: 1;
  }
</style>