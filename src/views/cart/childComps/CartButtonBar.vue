<template>
  <div class="buttom-bar">
    <!-- 全选按钮 -->
    <div class="check-all">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price"> 合计：{{totalPrice}} </div>

    <div class="calclate" @click="calcClick"> 去计算({{checkLength}}) </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name:'CartButtonBar',
  components:{
    CheckButton
  },
  computed:{
    // 合算 
    // filter()过滤返回为true的，reduce()算总数，toFixed(2)保留两位小数
    totalPrice(){
      return '￥' +  this.$store.state.cartList.filter(item => item.checked).reduce((preValue,item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },

    // 去计算的商品个数
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length;
    },

    // 监听全选按钮是否显示全选
    isSelectAll(){
      // 方法 1
      // 先找没有被选中的数组长度
      // 再将不选中的数组长度做转换（有不选中=>false, 没有不选中=>）
      // if(this.$store.state.cartList.length){
      //   return !(this.$store.state.cartList.filter(item => !item.checked).length);
      // } else {
      //   return false;
      // }

      // 方法 2
      // 如果有一个不选中，那不全选中
      if(this.$store.state.cartList.length === 0) return false;
      return !(this.$store.state.cartList.find(item => !item.checked));

      // 方法 3
      // if(this.$store.state.cartList.length === 0) return false;
      //  for(let item of this.$store.state.cartList){
      //    if(!item.checked){
      //      return false;  // 有一个 item.checked = false 则退出循环，返回false
      //    }
      //  }
      //  return true; // item.checked 都为true，则返回true

    },
  },
  methods:{
    // 全选按钮
    checkClick() {
      // if(this.isSelectAll){ // 全部选中
      //   this.$store.state.cartList.forEach(item => item.checked = false);
      // }else{  // 全部不选中或部分不不选中
      //   this.$store.state.cartList.forEach(item => item.checked = true);
      // }

      const isAll = this.isSelectAll;
      this.$store.state.cartList.forEach(item => item.checked = !isAll);
    },

    // 去计算按钮
    calcClick(){
      if(!this.checkLength){
        this.$toast.show('请选择购买的商品');
      }else{
        this.$toast.show('已成功付款'+ this.totalPrice + '元', 1000);
      }
    },
  },
}
</script>

<style scoped>
.buttom-bar{
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  /* position: relative; */
  display: flex;
  font-size: 14px;
}

.check-all{
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-button{
  line-height: 16px;
  margin-right: 5px;
}

.price{
  margin-left: 20px;
}

.calclate{
  margin-left: auto;
  background-color: red;
  width: 90px;
  text-align: center;
  color: #fff;
}
</style>