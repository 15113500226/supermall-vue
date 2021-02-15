<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

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

    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
    </ul>
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

<style>
  #home{
    padding-top: 44px;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 导航栏固定定位 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
  }

  .tab-control{
    /* 吸顶效果 */
    position: sticky;
    /* 页面上拉，这个组件就会停留在top为44px的位置 */
    top: 44px;
    z-index: 99;
  }
</style>