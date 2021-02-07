import axios from 'axios'

// 封装多个实例

// 第三种:axios联用promise
// export function request(config) {
//     return new Promise((resolve, reject) => {
//         const instance = axios.create({
//             baseURL: 'http://123.207.32.32:8000',
//             timeout: 5000,
//         })

//         instance(config).then(res => {
//             resolve(res);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

// 第四种方式
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

// default就表示只导出一个东西
// export default axios