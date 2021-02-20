<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 插入的东西都往 <slot> 放 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  data(){
    return {
      scroll: null,
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: 2,
      click: true,
      mouseWheel: true,
      observeDOM: true,
    });
  },
}
</script>

<style>

</style>