import { request } from './request'

// 导出首页的多个数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata',
    })
}