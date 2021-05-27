<template>
   <div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActive"><slot name="item-icon"></slot></div>
     <div v-else><slot name="item-icon-active"></slot></div>  
     <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
     <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    },
  },
  data(){
    return{
      // isActive: false,
    }
  },
  computed:{
    isActive(){
      // $route 当前活跃路由
      // indexOf 返回的ture和false，如果等于-1就说明冲$route.path中没有找到this.path
      //  /home -> item1(/home) = ture
      //  /home -> item1(/category) = false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {};
    },
  },
  methods:{
    itemClick(){
      console.log('itemClick');
      // this.$router.replace(this.path).catch(() => {});
      this.$router.replace(this.path);
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    /* tabbar的高度一般是49px */
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }

  /* .active{
    color: #d81e06;
  } */
</style>