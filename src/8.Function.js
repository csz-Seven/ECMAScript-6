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
        let f1 = function (x, y = 5, z) {
            return [x, y, z];
        }
        let f2 = function (x = 1, y) {
            return [x, y];
        }
    }

    /***函数的length属性***/
    {
        //length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数
        console.log(`1.fn.length  (function (a, b, c = 5) {}).length `, (function (a, b, c = 5) {
        }).length)

        //ps:设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
        console.log(`1.fn.length  (function (a,  c = 5,b) {}).length `, (function (a, c = 5, b) {
        }).length)
    }

    /***作用域***/
    {
        //不会指向全局变量
        {
            let x = 1;
            let fn1 = function (x, y = x) {
                console.log(y)
            }
            // fn1(2)
        }

        // 当全局变量 以及函数定义不存在时
        {
            let fn2 = function (y = z) {
                console.log(z)
            }
            // fn2()
        }

        //如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。
        {
            let foo = 'outer'
            let fn3 = function (func = () => foo) {
                let foo = 'inner';
                console.log(func())
            }
            // fn3()  outer
        }

        //复杂例子
        {
            var k = 1;

            function foo(k, y = function () {
                k = 2;
            }) {
                //此处重新声明需要注意
                var k = 3;
                y()
                console.log(k);
            }

            // foo()   3
            // console.log(k) 1
        }

        // 应用
        {
            //参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会运行。
            //利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
            let fn1 = function () {
                throw new Error('Missing parameter')
            }
            let fn2 = function (p = fn1()) {
                return p
            }

            // Error: Missing parameter
            // fn2()

            // 参数设置为undefined ，表明是可以缺省的.
            let fn3 = function (option = undefined) {

            }
        }

        // rest参数   (...变量名)
        {
            // rest参数 代替 arguments
            // arguments对象不是数组，而是一个类似数组的对象。
            //函数的length属性，不包括 rest 参数。
            //用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
            let fn = function (...values) {
                let sum = 0;
                for (let val of values) {
                    sum += val
                }
                return sum
            }
            console.log(fn(1, 2, 3, 4, 5, 6))
        }
    }
}
