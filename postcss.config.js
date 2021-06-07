module.exports = {
    plugins: {
        autoprefixer: {},

        // 下面继续对插件做配置
        'postcss-px-to-viewport': {
            // options
            // 开发中，标准的设计稿是750的（retina高清屏）
            // <ratina高清屏就是一个点上面有2个像素，如750的稿写一个30px的东西，就相当于375的屏幕上写15px的东西，也就是二倍图>
            viewportWidth: 375, // 视口宽度，对应的是设计稿的宽度
            viewpostHeight: 667, // 视口高度，对应的是设计稿的高度（也可以不设置） 
            // 375*667 == iphone6的屏幕（一般设计稿都是根据iphone6的屏幕 750*1334），如此项目写着20px，iphone6上就是20px，而换到其他屏幕下就换成等比例的缩放
            unitPrecision: 5, //  指定'px'转化为视口单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // (String) 希望使用的视口单位，一般是vw，也有vh（宽度、高度）
            selectorBlackList: ['.ignore', '.tab-bar', '.tab-bar-item'], // 指定不需要转换的类
            /*
             * (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
             * 如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配
             *     例如 selectorBlackList 为 ['body'] 的话， 那么 .body-class 就会被忽略
             * 如果传入的值为正则表达式的话，那么就会依据CSS选择器是否匹配该正则
             *     例如 selectorBlackList 为 [/^body$/] , 那么 body 会被忽略，而 .body 不会
             */
            minPixelValue: 1, // 小于或等于'1px'不转换为视口单位（375上显示1px，320上就不用显示0.8px了，直接1px）
            mediaQuery: false // (Boolean) 媒体查询里的单位是否需要转换单位
        }
    }
}