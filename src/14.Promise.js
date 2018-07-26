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
            // reject(new Error('实例5-' + 'fail'))
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


// ★★★  实例7  ★★★
// Promise.prototype.catch()
// catch接收内部抛出的错误
{
    const someAsyncThing = function () {
        return new Promise(function (resolve, reject) {
            resolve(x + 2);
        })
    }

    someAsyncThing()
        .catch(function (err) {
            console.log('oh no', err)
        })
        .then(function () {
            console.log('实例7')
        })
}


// ★★★  实例8  ★★★
// Promise.prototype.catch()
// catch内部可以在抛出错误，如需要接收 需要catch().catch()
{
    const someAsyncThing = function () {
        return new Promise(function (resolve, reject) {
            resolve(x + 2);
        })
    }
    someAsyncThing().then(function () {
    }).catch(function (err) {
        console.log('实例8', err)
        y + 2;
    }).catch(function (err) {
        console.log('实例8', err)
    })
}


// ★★★  实例9  ★★★
// Promise.prototype.finally()
// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作.
// finally本质上是then方法的特例.
{
    // promise
    //     .then(result => {})
    //     .catch(error => {})
    //     .finally(() => {});

    // 等价于↓
    // promise
    //     .finally(()=>{
    //
    //     })

    // then实现方法
    // promise
    //     .then(
    //         result => {
    //             return result;
    //         },
    //         error => {
    //             throw error;
    //         }
    //     )
}


// ★★★  实例10  ★★★
// Promise.all()
// 用于将多个 Promise 实例，包装成一个新的 Promise 实例.
{
    // const p = Promise.all([p1, p2, p3]);
    // （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

    // （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

    //  如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
}


// ★★★  实例11  ★★★
// Promise.all()
{
    // const p1 = new Promise((resolve, reject) => {
    //     resolve('实例11-p1')
    // })
    //     .then(result => {
    //         result
    //     })
    //     .catch(e => e);
    //
    // const p2 = new Promise((resolve, reject) => {
    //     throw new Error('实例11-p2-报错');
    // })
    //     .then(result => result)
    //     .catch(e => e)
    //
    // Promise.all([p1, p2])
    //     .then(result => console.log(result))
    //     .catch(e => console.log(e))
}


// ★★★  实例12  ★★★
// Promise.race将多个 Promise 实例，包装成一个新的 Promise 实例。
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
{
    // const p = Promise.race([
    //     fetch('/resource-that-may-take-a-while'),
    //     new Promise(function (resolve, reject) {
    //         setTimeout(() => reject(new Error('request timeout')), 5000)
    //     })
    // ])
    //
    // p
    //     .then(console.log)
    //     .catch(console.error)
}


// ★★★  实例13  ★★★
// Promise.resolve 将现有对象转为 Promise 对象
{
    Promise.resolve('实例13')
    // 等价于
    new Promise(resolve => resolve('实例13'))

    // Promise.resolve 四种参数情况
    // 1.如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

    // 2.thenable对象指的是具有then方法的对象。
    {
        let thenable = {
            then: function (resolve, reject) {
                resolve('实例13-2thenable对象')
            }
        }
        let p1 = Promise.resolve(thenable);
        p1.then(function (value) {
            console.log(value)
        })
    }

    // 3.参数不是具有then方法的对象，或根本就不是对象.
    {
        const promise3 = Promise.resolve('实例13-3')
        promise3.then(function (s) {
            console.log(s)
        })
    }

    // 4.不带参数
    {
        const p = Promise.resolve()
        p.then(function () {
            console.log('实例13-4 不带参数，立即返回resolved，立即执行then')
        })
    }
}


// ★★★  实例14  ★★★
// Promise.reject(reason) 将现有对象转为 Promise 对象,该实例的状态为rejected。
{
    const p =Promise.reject('实例14-Promise.reject')
//  等同于
    const p2 = new Promise((resolve, reject) => {
        reject('实例14-Promise.reject-2')
    })

    p.then(null,function (s) {
        console.log(s)
    })
}


// ★★★  实例15  ★★★
// Promise实现图片加载
{
    const preloadImage = function (path) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = path;
        })
    }
}


// ★★★  实例16  ★★★
// Promise.try()
{
    // 区分同步操作 和 异步操作
    //使用then方法 管理流程
}

// 2018-07-26 15:57:15
