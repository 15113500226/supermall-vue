<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- TabControl模块 -->
    <tab-control class="tab-control tab-control-fixed" :titles="titles" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>

    <scroll :class="{content:scrollClass}" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"  @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐信息展示 -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行模块 -->
      <feature-view/>
      <!-- TabControl模块 -->
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" ref="tabControl2"/>
      <!-- 商品展示 -->
      <goods-list :goods="currentType"/>
      <!-- <goods-list :goods="goods[currentType].list"/> -->
    </scroll>

    <!-- 回到顶部按钮 -->
    <!-- native是监听组件的点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
  import BackTop from 'components/content/backTop/BackTop'

  // 导入方法、额外的数据
  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils.js'  //防抖函数

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
      BackTop,
    },
    data(){
      return{
        banners:[], // 存放轮播图的数据
        recommends:[],  // 存放推荐信息的数据
        titles:['流行', '新款', '精选'],  // 定义tabControl的标题
        // 数据模型（三类数据pop、news、sell）， list是当前此类加载page页的所有的数据，page是记录加载到第几页了
        goods:{
          'pop':{ page:0, list:[], savePopY:0 },
          'new':{ page:0, list:[], saveNewY:0 },
          'sell':{ page:0, list:[], saveSellY:0 },
        },
        currentType:[], // 用于存放某一类的list数据
        currentGoodType:'', // 用于存放某一类
        isShowBackTop:false,  // 是否展示BackTop按钮
        tabOffsetTop:0,  // tabControl组件的到最近的一个具有定位祖宗元素的距离
        isTabFixed:false, // tabControl默认不吸顶
        scrollClass:true, // 动态的绑定scroll的class
        saveY:0,  // 用于保存离开Home.vue时的位置
        // saveScrollY:0, // 用于保存保存scroll滚动时的位置
        ItemImgListener:null, // GoodListitem的图片监听
      }
    },
    // computed:{
    //   showGoods(){
    //     return this.goods[currentType].list
    //   }
    // },
    // 切换路由时，当前路由就会销毁
    destroyed(){
      console.log('Home界面切换，当前界面被destroyed销毁');
    },
    // 当前路由出于活跃状态时（进来）调用
    activated(){
      // 1.保存y值
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();  // 对scroll做一次刷新，防止切换回Home路由时不能滚动

      // 2.取消全局事件的监听
      // $off不能只传入一个事件，一旦传一个事件的话意味着所有的地方关于这个事件的监听都会被取消，要告诉它取消哪一个监听的函数（这里是取消mounted里面的图片监听）
      this.$bus.$off('itemImageLoad',this.ItemImgListener)
    },
    // 当前路由不活跃时（离开）调用
    deactivated(){
      // this.saveY = this.saveScrollY;
      this.saveY = this.$refs.scroll.getScrollY();

      // 切换Home.vue时，使tabControl三类的位置不同步
      // if(this.currentGoodType === 'pop'){
      //   this.goods.pop.savePopY = this.$refs.scroll.getScrollY();
      //   this.saveY = this.goods.pop.savePopY;
      // }else if(this.currentGoodType === 'new'){
      //   this.goods.new.savePopY = this.$refs.scroll.getScrollY();
      //   this.saveY = this.goods.new.savePopY;
      // }else if(this.currentGoodType === 'sell'){
      //   this.goods.sell.savePopY = this.$refs.scroll.getScrollY();
      //   this.saveY = this.goods.sell.savePopY;
      // }
      // console.log(this.goods.pop.savePopY, this.goods.new.savePopY, this.goods.sell.savePopY);
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    // mounted在整个实例中只执行一次，编译好的html挂载到页面完成后执行的事件钩子
    mounted(){
      // 1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,2000);  // debounce防抖

      // 对监听的事件进行保存
      this.ItemImgListener = () => {
        // console.log('--------');
        // this.$refs.scroll.refresh();
        refresh();
      }
      // 监听item中图片加载完成——监听事件总线 this.$bus.on('发射出来的事件', fn)
      this.$bus.$on('itemImageLoad', this.ItemImgListener)
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        // console.log(index);
        if(index === 0){
          this.currentType = this.goods.pop.list;
          this.currentGoodType = 'pop';
        }else if(index === 1){
          this.currentType = this.goods.new.list;
          this.currentGoodType = 'new';
        }else if(index === 2){
          this.currentType = this.goods.sell.list;
          this.currentGoodType = 'sell';
        };

        this.$refs.tabControl1.currentIndex = index;  // 让两个tabControl组件显示的type一样
        this.$refs.tabControl2.currentIndex = index;
        // switch(index){
        //   case 0:
        //     this.currentType = 'pop'
        //     break
        //   case 1:
        //     this.currentType = 'new'
        //     break
        //    case 2:
        //     this.currentType = 'sell'
        //     break
        // }
      },
      backClick(){
        // this.$refs.scroll是<scroll>、this.$refs.scroll.scroll是scroll变量、scrollTo(x, y, time)
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        // 调用定义的scrollTo方法（定义在Scroll.vue中）
        this.$refs.scroll.scrollTo(0,0);
      },
      // 实时监听滚动(回到顶部)
      contentScroll(position){
        // 1. 判断BackTop是否显示
        // console.log(position.y);
        // if(position.y < -1000){
        //   this.isShowBackTop = true;
        // }else if(position.y > -1000){
        //   this.isShowBackTop = false;
        // }
        this.isShowBackTop = position.y < -1000;

        // 2. 决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = position.y < -this.tabOffsetTop;  // 动态的决定是否吸顶

        // this.saveScrollY = position.y; // 保存滚动的位置
      },
      // 上拉加载更多
      loadMore(){
        // 加载哪一类的数据：this.getHomeGoods、记录类型：this.currentGoodType
        this.getHomeGoods(this.currentGoodType);

        // 重新计算可滚动的区域（高度），防止图片上拉后图片未完全加载。
        this.$refs.scroll.refresh();
      },
      // 监听轮播图加载，获取this.$refs.tabControl.$el.offsetTop
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        console.log(this.tabOffsetTop);
      },

      /** 
       * 网络请求相关的方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        // this.goods[type]表示传入的是哪一类的,goods是对象，当对象获取的属性是变量的时候，就是goods[type]的写法
        // 最开始：0 + 1
        let page = this.goods[type].page + 1;
        // console.log(page);
        getHomeGoods(type,page).then(res=>{
          // console.log(res.data.list);
          // ...res.data.list是对这个数组做解析，之后将这个数组的元素一个一个拿出来添加到this.goods[type].list中
          this.goods[type].list.push(...res.data.list);
          // 这个类型的page在数据模型中加一
          this.goods[type].page += 1;

          // 完成这次的上拉加载
          this.$refs.scroll.finishPullUp();
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

  /* .tab-control{ */
    /* position: sticky; 吸顶效果 */
    /* top: 44px;  页面上拉，这个组件就会停留在top为44px的位置 */
    /* z-index: 9; */
  /* } */

  .content{
    /* overflow: hidden; */
    /* 动态的确定中间滚动的高度（方法一），因为滚动区域在不同适配器的高度是不一样的 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content{ */
    /* 动态的确定中间滚动的高度（方法二） */
    /* height: calc(100% - 44px - 49px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .tab-control-fixed{
    position: relative;
    z-index: 9;
  }
</style>