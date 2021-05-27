<template>
  <div class="check-button" :class="{'check': isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
}
</script>

<style scoped>
.check-button{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #aaa;
}
.check {
  background-color: red;
  border-color: red;
}

.check-button img{
  width: 16px;
  height: 16px;
}
</style>