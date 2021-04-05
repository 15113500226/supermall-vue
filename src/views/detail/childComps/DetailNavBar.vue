<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar class="detail-nav">
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center-slot">
        <div v-for="(item,index) in titles" :key="index" class="titles-item" :class="{active:index === currentIndex}" @click="titlesClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  components:{
    NavBar,
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0,  // 记录当前谁处于选中
    }
  },
  methods:{
    titlesClick(index){
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    backClick(){
      this.$router.back();
      // this.$router.go(-1);
    },
  },
}
</script>

<style scoped>
/* .detail-nav{ */
  /* background-color: var(--color-tint);
  color: #fff; */
/* } */

.detail-nav img{
  position: relative;
  top: 5px;
  width: 20px;
}

.center-slot{
  display: flex;
}

.titles-item{
  flex: 1;
  font-size: 14px;
}

.active{
  color: var(--color-high-text);
}
</style>