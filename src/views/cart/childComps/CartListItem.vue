<template>
  <div id="shop-item">
    <!-- 选择框 -->
    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>

    <!-- 图片 -->
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <!-- 商品信息 -->
    <div class="item-info">
      <!-- 删除 -->
      <span class="delete-product" @click="del"> x </span>
      <!-- 标题、描述 -->
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <!-- 价格、数量 -->
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">×{{itemInfo.count}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name:'CartListitem',
  props:{
    itemInfo:{
      type:Object,
      default(){
        return {}
      },
    },
  },
  components:{
    CheckButton,
  },
  methods:{
    // 勾选商品
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    
    // 删除
    del() {
      const i = this.$store.state.cartList.indexOf(this.itemInfo);
      this.$store.commit('delProduct', i);

      if (this.$store.state.cartList.indexOf(this.itemInfo)) {
        this.$toast.show('删除成功');
      } else {
          this.$toast.show('删除失败');
      }
    },
  },
}
</script>

<style scoped>
#shop-item{
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

/* 多选选择 */
.item-selector{
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 标题、描述 */
.item-title, .item-desc{
  overflow:hidden; 
  white-space:nowrap;  
  text-overflow:ellipsis;  
}

.item-img{
  padding: 5px;
}

.item-img img{
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info{
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-title{
  margin-top: 10px;
  font-weight: 550;
}

.item-info .item-desc{
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

.info-bottom{
  margin-top: 5px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price{
  color: orangered;
}

/* 删除 */
.delete-product {
  width: 15px;
  height: 15px;
  line-height: 12px;
  text-align: center;
  /* background-color: #ccc; */
  position: absolute;
  right: 0;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 50%;
  overflow: hidden;
}
</style>