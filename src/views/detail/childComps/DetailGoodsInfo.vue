<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <!-- 商品描述 -->
    <div class="info-desc clear-fix">
      <div class="start-line"></div>
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
      <div class="end-line"></div>
    </div>

    <!-- 穿着效果 -->
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>

    <!-- 商品详情图片 -->
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodsInfo',
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      },
    },
  },
  data(){
    return{
      counter:0,
      imagerLength:0, // 详情图片的长度
    }
  },
  methods:{
    // 监听图片加载
    imgLoad(){
      // 判断：让事件发射只有一次，要不然有几张图片就发射几次（所有的图片都加载完了，那么进行一次回调就可以了）
      // counter先加再对比
      // this.imagerLength = this.detailInfo.detailImage[0].list.length;  // 这样写的话每次都调用
      if(++this.counter === this.imagerLength){
        this.$emit('imageLoad');
      };
    },
  },
  watch:{
    // watch监听detailInfo对象的变化，之后将imagerLength属性赋值给imagerLength，这样写只获取一次，当有变化的时候再获取，避免哦用多次
    detailInfo(){
      this.imagerLength = this.detailInfo.detailImage[0].list.length;
    },
  },
}
</script>

<style scoped>
  .goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .start{
    width: 0; 
    height: 0; 
    border: 3px solid #000;
    margin-left: 8px;
  }

  .start-line{
    width: 10px;
    height: 1px;
    border-left: 100px solid #000;
    margin-left: 8px;
  }

  .end{
    width: 0; 
    height: 0; 
    border: 3px solid #000;
    position: relative;
    right: -303px;
  }

  .end-line{
    width: 10px;
    height: 1px;
    border-left: 100px solid #000;
    position: relative;
    right: -209px;
  }

  .desc{
    font-size: 14px;
    text-indent: 2em;
    padding: 10px 15px;
  }

  .info-key{
    font-size: 16px;
    padding: 10px 15px 5px;
    font-weight: 600;
  }

  .info-list img{
    width: 100%;
  }
</style>