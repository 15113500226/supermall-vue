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