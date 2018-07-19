// ★★★  实例1  ★★★
{
    function timeout(ms) {
        return new Promise((resolve, reject) => {
            // setTimeout(function(){}[,delay,param1,param2,...]
            // setTimeout 第三个参数
            // param1, ..., paramN 可选
            // 附加参数，一旦定时器到期，它们会作为参数传递给function 或 执行字符串（setTimeout参数中的code
            // 参考：MDN
            // url：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout
            setTimeout(resolve, ms, '实例1');
        })
    }

    // timeout(2000).then((value) => {
    //     console.log(value)
    // })
}


// ★★★  实例2  ★★★
// Promise创建后就立即执行
{
    let promise = new Promise(function (resolve, reject) {
        console.log('Promise');
        resolve();
    })
    // promise.then(function () {
    //     console.log('resolved')
    // })
    // console.log('实例2')
}


// ★★★  实例3  ★★★
// 图片加载
{
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

    // let loadImagePromise = loadImageAsync('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-669878.png')
    // loadImagePromise.then(function (res) {
    //     console.log('实例3-图片加载完成')
    // })
}


// ★★★  实例4  ★★★
// 使用Promise封装Ajax
{
    const getJSON = function (url) {
        const promise = new Promise(function (resolve, reject) {
            const client = new XMLHttpRequest();
            client.open("GET", url);
            client.onreadystatechange = function () {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response)
                } else {
                    reject(url)
                }
            }
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send();
        })

        return promise;
    }
    // getJSON('mock.json').then(function (res) {
    //     console.log("实例4-封装Ajax" + res)
    // }), function (err) {
    //     console.error("实例4-请求失败url:" + err);
    // }
}


// ★★★  实例5  ★★★
// Promise2 的参数 传入 Promise1
// 结果：Promise1状态确认后，Promise2立即调用
//      Promise1 resolve或reject并不会终结 Promise2 的参数函数的执行.
{
    const promise1 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject(new Error('实例5-' + 'fail'))
        }, 3000)
    })
    const promise2 = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(promise1)
        }, 1000)
    })

    // promise2
    //     .then(result => {
    //         console.log('实例5-Promise2 的参数 传入 Promise1：' + result)
    //     })
    //     .catch(error => {
    //         console.log('实例5-Promise2 的参数 传入 Promise1：' + error)
    //     })
}


// ★★★  实例6  ★★★
// Promise.prototype.catch()
// promise抛出一个错误，就被catch方法指定的回调函数捕获
// reject方法的作用，等同于抛出错误
{
    // 写法1
    const promise1 = new Promise(function (resolve, reject) {
        throw new Error('实例6-写法1')
    })
    promise1.catch(function (error) {
        console.log(error)
    })

    // 写法2
    const promise2 = new Promise(function (resolve, reject) {
        try {
            throw new Error('实例6-写法2')
        } catch (e) {
            reject(e)
        }
    })
    promise2.catch(function (error) {
        console.log(error)
    })

    // 写法3
    const promise3 = new Promise(function (resolve, reject) {
        reject(new Error('实例6-写法3'))
    })
    promise3.catch(function (error) {
        console.log(error)
    })
}


/*
* 书签
* 2018-07-19 15:32:14
* 上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
* */
