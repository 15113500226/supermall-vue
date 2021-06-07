import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // 将vue实例赋值给$bus (添加事件总线)
Vue.use(toast) // 安装 toast 插件
FastClick.attach(document.body) // fastclick: 解决移动端延迟300ms
    // 使用懒加载插件
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.gif'),
})

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')