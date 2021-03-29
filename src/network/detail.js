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

// 因为这样做体现了面向对象的封装思想，把很多服务器访问的东西先封装到一个类里面，再来创建类的一个对象，将对象传到下一层组件里面，组件面向这个对象开发就可以了
// 定义一个class，constructor构造函数来存储多种数据
export class GoodInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

// 之后将g传给组件，组件面向这一个对象开发就可以了，因它里面存了很多数据
// const g = new Goods(xxx,xxx,xxx)
// g.title;
// g.desc;