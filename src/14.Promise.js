// ★★★  实例1  ★★★
function timeout(ms) {
    return new Promise((resolve, reject) => {
        // setTimeout(function(){}[,delay,param1,param2,...]
        // setTimeout 第三个参数
        // param1, ..., paramN 可选
        // 附加参数，一旦定时器到期，它们会作为参数传递给function 或 执行字符串（setTimeout参数中的code
        // 参考：MDN
        // url：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout
        setTimeout(resolve, ms, 'seven');
    })
}

timeout(2000).then((value) => {
    console.log(value)
})


// ★★★  实例2  ★★★
// Promise创建后就立即执行
let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve();
})
promise.then(function () {
    console.log('resolved')
})
console.log('实例2')


// ★★★  实例3  ★★★
// 图片加载
function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        const image = new Image();

        image.onload = function () {
            resolve(image);
        }

        image.onerror = function () {
            reject(new Error('图片加载失败url:' + url))
        }

        image.src = url;
    })
}
loadImageAsync('www.a.com')
