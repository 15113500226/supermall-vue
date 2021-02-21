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
  props:{
    probeType:{
      type:Number,
      default:0,
    },
  },
  data(){
    return {
      scroll: null,
    }
  },
  mounted(){
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 不要将probeType都设置为实时监听，会影响性能
      probeType: this.probeType,
      click: true,
      mouseWheel: true,
      observeDOM: true,
    });

    // 2. 监听滚动的区域
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll', position);
    })
  },
  methods:{
    scrollTo(x, y, time=500){
      this.scroll.scrollTo(x,y,time);
    },
  },
}
</script>

<style>

</style>