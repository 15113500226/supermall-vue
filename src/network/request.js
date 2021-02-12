import axios from 'axios'

// 首页数据
export function request(config) {
    // 1. 创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000,
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        console.log(err);
    });

    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    })

    // 3. 发送真正的网络请求
    return instance(config)
}

// 首页商品数据
export function requestGoodData(config) {
    const instance1 = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5/',
    })

    instance1.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err);
    })

    instance1.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    })

    return instance1(config)
}

// default就表示只导出一个东西
// export default axios