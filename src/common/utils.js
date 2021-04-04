// 防抖函数（要执行的函数，等待时间）
export function debounce(func, delay) {
    let timer = null;

    return function(...args) {
        if (timer) clearTimeout(); // 判断是否有定时器，如果有的话清除，没有则准备下一个定时器

        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// date格式化
export function formatDate(date, fmt) {
    // 1.获取年份
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    // 获取其余时间点
    // （M+ 是 正则表达式中的一个规则，+表示至少一个，多了不限，M+表示匹配一个或者多个M，M*表示0个或者多个M，M?表示0个或者一个M）
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    }

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};