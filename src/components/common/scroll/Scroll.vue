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
    pullUpLoad:{
      type:Boolean,
      default:false,
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
      probeType: this.probeType,  // 实时监听滚动。
      pullUpLoad: this.pullUpLoad, // 上拉加载更多
      click: true,  // 点击生效
      mouseWheel: true, // 鼠标滚动
      observeDOM: true, // 观察最新的DOM树变化
      observeImage: true, // 根据图片的高度动态的刷新scrollerHeight
    });

    // 2. 监听滚动的区域
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll', position);
    });

    // 3. 上拉加载更多(监听scroll滚动到底部)
    this.scroll.on('pullingUp',()=>{
      // console.log('上拉加载更多');
      this.$emit('pullingUp');
    });
  },
  methods:{
    // 回到顶部
    scrollTo(x, y, time=500){
      // &&并且，都为true的时候才会执行
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    // 完成此次的上拉加载
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新计算可滚动的高度
    refresh(){
      // console.log('-----');
      this.scroll && this.scroll.refresh();
    },
    // 拿到scroll滚动的Y值
    getScrollY(){
      // 拿到scroll滚动的y值
      return this.scroll ? this.scroll.y : 0;
    },
  },
}
</script>

<style>

</style>