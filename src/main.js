import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // 将vue实例赋值给$bus

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')