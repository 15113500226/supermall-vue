import { GoodInfo } from 'network/detail.js';
<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <!-- 用户评价、更多 -->
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <!-- 用户头像、用户名 -->
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <!--  -->
    <div class="info-detail">
      <!-- 评论内容 -->
      <p>{{commentInfo.content}}</p>
      <!-- 评论的时间、用户购买商品的详情 -->
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <!-- 反馈图 -->
      <div class="info-imgs">
        <img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// 导入工具函数
import { formatDate } from 'common/utils'

export default {
  name:'DetailCommentInfo',
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      },
    },
  },
  filters:{
    showDate(value){
      // 1.将时间戳转为Date对象
      const date = new Date(value * 1000);

      // 2.将date进行格式化
      // return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      return formatDate(date, 'yyyy-MM-dd');
    },
  },
}
</script>

<style scoped>
  .comment-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  /* 用户评价、更多 */
  .info-header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title{
    float: left;
    font-size: 15px;
  }

  .header-more{
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  /* 用户头像、用户名 */
  .info-user{
    padding: 10px 0 5px;
  }

  .info-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span{
    font-size: 15px;
    position: relative;
    top: -15px;
    margin-left: 10px;
  }

  /* 评论内容、时间、购买的商品详情、反馈图 */
  .info-detail{
    padding: 0 5px 15px;
  }

  .info-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date{
    margin-right: 8px;
  }

  .info-imgs{
    margin-top: 10px;
  }

  .info-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>