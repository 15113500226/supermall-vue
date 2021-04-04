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

// 推荐数据的请求
export function getRecommend() {
    return requestGoodData({
        url: '/recommend',
    })
}

// 因为数据有点复杂，干脆自己搞一个对象，将数据搞到对象中，之后面向这个对象就可以了
// 这样做体现了面向对象的封装思想，把很多服务器访问的东西先封装到一个类里面，再来创建类的一个对象，将对象传到下一层组件里面，组件面向这个对象开发就可以了
// 定义一个class，constructor构造函数来存储多种数据
// 商品信息数据
export class GoodInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title; // 商品标题
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price; // 新价格
        this.oldPrice = itemInfo.oldPrice; // 老价格
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

// 店铺详情数据
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo; // 店铺logo
        this.name = shopInfo.name; // 店铺名
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells; // 销量
        this.score = shopInfo.score; // 店铺评分
        this.goodsCount = shopInfo.cGoods; // 商品数量
    }
}

// 商品尺寸、发货地等
export class GoodsParam {
    constructor(info, rule) {
        // 注：images可能没有值（某些商品有值，某些没值）
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}