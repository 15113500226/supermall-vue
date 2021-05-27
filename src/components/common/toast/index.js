import Toast from './Toast.vue'

const obj = {}

// Vue.ues(toast) 会调用插件的 intall函数, 
// 执行 install函数 的时候默认还会传入一个参数（这个参数就是 vue），所以就没必要导入 Vue 了
obj.install = function(Vue) {
    // console.log(Toast.$el); // 报错 因为 Toast.$el 在 install 的时候还没渲染出来
    // document.body.appendChild(Toast.$el);


    // 1. 创建组件构造器
    const ToastContrustor = Vue.extend(Toast);
    // 2. new的方式，根据组件构造器，可以创建出来一个组件对象（全局注册，通过 new组件构造器 的方式，创建出 toast组件）
    const toast = new ToastContrustor();
    // 3. 将组件对象，手动挂载到某一个元素上（将 toast组件 注册为一个div）
    toast.$mount(document.createElement('div'));
    // 4. toast.$el 对应的就是上面的 div 了（将 toast组件 添加到body）
    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;
}

export default obj