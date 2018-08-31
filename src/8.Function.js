/**
 *  作者:Seven
 *  时间:2018/8/29 11:29
 *  Email:csz.seven@gmail.com
 *  描述:函数的扩展
 */

/**
 *  作者:Seven
 *  时间:2018/8/31 16:42
 *  Email:csz.seven@gmail.com
 *  描述:1.函数参数的默认值
 */
{
    /***基本用法***/
    // ES6之前
    // 缺点：false ''类似的值 不起作用
    function fn1(x, y) {
        y = y || 'World';
        console.log(x, y)
        // 改进
        // if(typeof y === 'undefined'){
        //     y='World';
        // }
    }

    // ES6 参数默认值是惰性求值的
    function fn2(x, y = 'World') {
        console.log(x, y)
    }

    // 参数变量是默认声明的，所以let和const不能重新声明
    {
        let fn = function (x = 5) {
            // let x = 1; err
            // const x = 2; err
        }
    }


    /***与结构赋值默认值结合使用***/
    {
        let fn = function ({x, y = 5}) {
            console.log(`1.结构赋值使用 `, x, y)
        }
        fn({}) // undefined 5
        fn({x: 1}) // x:1 y:5
        fn({x: 1, y: 2}) // x:1 y:2
        try {
            fn() //此时未声明 x y
        } catch (e) {
            console.warn(`1.结构赋值使用 fn()`)
        }

        //只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。
        {
            let fn = function ({x, y = 5} = {}) {
                console.log(`1.结构赋值+默认值结合使用 {x, y = 5} = {} `, x, y)
            }
            fn()
        }
        {
            // ajax伪封装 函数参数的 数据结构+参数默认值
            // 数据结构只有匹配上了 才声明当中变量
            let fetch = function (url, {body = '', methods = "GET", headers = {}} = {}) {
                console.log(methods)
            }
        }
    }


    /***参数默认值的位置***/
    {
        // 默认值应该写在尾部 方便触发
        let f1 = function(x, y = 5, z) {
            return [x, y, z];
        }
        let f2 = function(x = 1, y) {
            return [x, y];
        }
    }
}
