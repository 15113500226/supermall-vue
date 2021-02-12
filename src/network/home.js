import { request, requestGoodData } from './request'

// 导出首页的多个数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata',
    })
}

// 导出首页商品数据
export function getHomeGoods(type, page) {
    return requestGoodData({
        url: '/home/data',
        params: {
            type,
            page,
        },
    })
}