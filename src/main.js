import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // 将vue实例赋值给$bus

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')