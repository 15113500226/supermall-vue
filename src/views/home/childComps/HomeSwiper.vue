<template>
  <!-- 轮播图 -->
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper,SwiperItem } from 'components/common/swiper/index'

export default {
  name:'HomeSwiper',
  components:{
    Swiper,
    SwiperItem,
  },
  props:{
    banners:{
      type: Array,
      default(){
        return []
      },
    }
  },
  data(){
    return{
      isload:false,
    }
  },
  methods:{
    imageLoad(){
      // isload发射一次事件后取反，其余就不会再发射事件了
      if(!this.isload){
        console.log('HomeSwiper 图片加载');

        this.$emit('swiperImageLoad');
        this.isload = true;
      }
    },
  },
}
</script>

<style>

</style>