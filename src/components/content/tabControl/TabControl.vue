<template>
  <div class="tab-control">
    <!-- 动态的绑定class，默认第0个item已经有active了,@click是监听那个item被点击 -->
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type: Array,
      default(){
        return []
      },
    },
  },
  data(){
    return{
      // 记录当前谁处于选中
      currentIndex: 0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
    },
  },
}
</script>

<style>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px;
    box-sizing: border-box;
  }

  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>