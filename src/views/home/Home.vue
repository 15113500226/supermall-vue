<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content">
      <!-- 轮播图 -->
      <home-swiper :banners="banners"/>
      <!-- 推荐信息展示 -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行模块 -->
      <feature-view/>
      <!-- TabControl模块 -->
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>
      <!-- 商品展示 -->
      <goods-list :goods="currentType"/>
    </scroll>

  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  // 导入方法、额外的数据
  import { getHomeMultidata, getHomeGoods } from 'network/home'

  export default {
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    data(){
      return{
        banners:[],
        recommends:[],
        titles:['流行', '新款', '精选'],
        // 数据模型（三类数据pop、news、sell）， list是当前此类加载page页的所有的数据，page是记录加载到第几页了
        goods:{
          'pop':{ page:0, list:[] },
          'new':{ page:0, list:[] },
          'sell':{ page:0, list:[] },
        },
        currentType:'',
      }
    },
    // computed:{
    //   showGoods(){
    //     return this.goods[currentType].list
    //   }
    // },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        // console.log(index);
        if(index === 0){
          this.currentType = this.goods.pop.list;
        }else if(index === 1){
          this.currentType = this.goods.new.list;
        }else if(index === 2){
          this.currentType = this.goods.sell.list;
        };
      },

      /** 
       * 网络请求相关的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        // this.goods[type]表示传入的是哪一类的,goods是对象，当对象获取的属性是变量的时候，就是goods[type]的写法
        // 最开始：0 + 1
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res=>{
          console.log(res.data.list);
          // ...res.data.list是对这个数组做解析，之后将这个数组的元素一个一个拿出来添加到this.goods[type].list中
          this.goods[type].list.push(...res.data.list);
          // 这个类型的page在数据模型中加一
          this.goods[type].page += 1;
        })
      },
    },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 导航栏固定定位 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }

  .tab-control{
    /* 吸顶效果 */
    position: sticky;
    /* 页面上拉，这个组件就会停留在top为44px的位置 */
    top: 44px;
    z-index: 9;
  }

  .content{
    /* overflow: hidden; */
    /* 动态的确定中间滚动的高度（方法一），因为滚动区域在不同适配器的高度是不一样的 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content{
    动态的确定中间滚动的高度（方法二）
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>