import { requestGoodData } from './request'

// 根据iid请求详情数据
export function getDetail(iid) {
    return requestGoodData({
        url: '/detail',
        params: {
            iid,
        },
    })
}