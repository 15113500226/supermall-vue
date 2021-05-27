<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 商品信息的展示 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息的展示 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!-- 参数信息 -->
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <!-- 评论信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <!-- 推荐信息 -->
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <!-- 底部工具栏 -->
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
// 公共组件
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// 发送网络请求
import { getDetail, GoodInfo, Shop, GoodsParam, getRecommend } from 'network/detail.js'
import { backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [ backTopMixin ],
  data(){
    return{
      iid:null, // 商品id
      topImages:[], // 轮播图数据
      goods:{}, // 存放Detail商品详细数据
      shop:{},  // 存放店铺信息
      detailInfo:{}, // 存放商品详细信息
      paramInfo:{}, // 存放参数信息
      commentInfo:{}, // 存放评论信息
      recommends:[],  // 存放推荐数据的信息
      themsTopys:[],  // 存放导航栏里类的对应位置
      NavBarCurrentIndex:0, // 存放导航栏标题的index
    }
  },
  created(){
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;  // 动态路由方式
    // this.iid = this.$route.query.iid;  // query方式

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;

      // <1>.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // <2>.获取商品信息
      this.goods = new GoodInfo(data.itemInfo, data.columns, data.shopInfo.services);

      // <3>.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // <4>.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // <5>.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // console.log(this.paramInfo);

      // <6>.获取评论信息(有些商品无评论信息，判断该商品是否有评论信息再做展示)
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }

      // $nextTick是等子组件赋完值且渲染完之后再调用
      this.$nextTick(() => {
        // 但是在$nextTick虽然渲染完了子组件的DOM，但其内部的图片还是未加载完的
        // offsetTop值不对很多都是图片未加载完导致的
        // this.themsTopys = []; // 清空数组，防止多次赋值

        // this.themsTopys.push(0);
        // this.themsTopys.push(this.$refs.params.$el.offsetTop);  // 参数的offsetTop
        // this.themsTopys.push(this.$refs.comment.$el.offsetTop);  // 评论的offsetTop
        // this.themsTopys.push(this.$refs.recommend.$el.offsetTop);  // 推荐的offsetTop
        // console.log(this.themsTopys);
      });
    })

    // 3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    })
  },
  mounted(){},
  updated(){},
  methods:{
    // vuex的actions 映射进来
    ...mapActions([ 'addCart' ]),

    // 监听图片加载
    imageLoad(){
      this.$refs.scroll.refresh();

      this.themsTopys = []; // 清空数组，防止多次赋值

      this.themsTopys.push(0);
      this.themsTopys.push(this.$refs.params.$el.offsetTop);  // 参数的offsetTop
      this.themsTopys.push(this.$refs.comment.$el.offsetTop);  // 评论的offsetTop
      this.themsTopys.push(this.$refs.recommend.$el.offsetTop);  // 推荐的offsetTop
      console.log(this.themsTopys);
    },

    // 点击导航栏跳转对应位置
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themsTopys[index], 1000);
    },

    // 滚动详情页位置，导航栏标题跳到指定标题
    contentScroll(position){
      // console.log(position);
      // 1.获取滚动的y值
      const positionY = -position.y;
      // console.log(positionY);

      // 2.将positionY和导航栏标题中的值进行对比
      let length = this.themsTopys.length;
      for(let i = 0; i < length; i++){
        // 错误一：这里的i是string，并非是数字,所以要么就用普通的for循环，要么就对i转化(i*1 或 parstInt)
        // 错误二：到推荐信息i是3，所以i+1=4是拿不到的（所以要分成两个判断）
        // console.log(i, typeof i);
        // if(positionY > this.themsTopys[i] && positionY < this.themsTopys[i+1]){
        //   console.log(i);
        // }
        if(this.NavBarCurrentIndex !== i && ((i<length-1 && positionY >= this.themsTopys[i] && positionY < this.themsTopys[i+1]) || (i===length-1 && positionY >= this.themsTopys[i]))){
          // console.log(i); // 打印太频繁
          this.NavBarCurrentIndex = i;
          // console.log(this.NavBarCurrentIndex);
          this.$refs.nav.currentIndex = this.NavBarCurrentIndex;
        }
      };

      // 是否显示回到顶部按钮
      if(positionY > 1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    },

    // 添加都购物车
    addToCart() {
      // 1. 获取购物车需要展示的信息（图片、标题、描述、当前价格）
      const product = {};
      product.image = this.topImages[0];  // 取某一张轮播图的图片
      product.title = this.goods.title; // 标题
      product.desc = this.goods.desc; // 描述
      product.price = this.goods.realPrice; // 价格
      product.iid = this.iid; // 当前商品的id
      // console.log(product);

      // 2. 将商品添加到购物车里（vuex）
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // });
      this.addCart(product).then(res => {
        console.log(res);
        this.$toast.show(res);  // toast弹窗
      });
      console.log(this.$store.state.cartList);
    },
  },
}
</script>

<style scoped>
/* 隐藏tabbar组件 */
  #detail{
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
  }

  /* 将导航栏显示（方法一） */
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index: 9999;
  }

/* 设置滚动高度 */
  .content{
    height: calc(100% - 44px - 49px);
    /* 将导航栏显示（方法二） */
    /* overflow: hidden; */
  }
</style>