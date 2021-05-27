<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data(){
    return{
      message:'',
      isShow:false,
      timer:null,
    }
  },
  methods:{
    show(message, duration=1000){
      // duration = duration || 1000;
      clearTimeout(this.timer)
      this.isShow = true;
      this.message = message;

      this.timer = setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  },
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,.7);
  color: #fff;
  padding: 8px 10px;
  transition: 0.3s;
  /* opacity: 1; */
  z-index: 9999;
}
</style>