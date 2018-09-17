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
    }
}


/**
 *  作者:Seven
 *  时间:2018/9/12 10:46
 *  Email:csz.seven@gmail.com
 *  描述:2.rest参数
 */
{
    // rest参数   (...变量名)
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


/**
 *  作者:Seven
 *  时间:2018/9/12 10:47
 *  Email:csz.seven@gmail.com
 *  描述:3.严格模式
 *  ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
 */
{
    //     // 报错
    //     function doSomething(a, b = a) {
    //         'use strict';
    //         // code
    //     }
    //
    // // 报错
    //     const doSomething = function ({a, b}) {
    //         'use strict';
    //         // code
    //     };
    //
    // // 报错
    //     const doSomething = (...a) => {
    //         'use strict';
    //         // code
    //     };
    //
    //     const obj = {
    //         // 报错
    //         doSomething({a, b}) {
    //             'use strict';
    //             // code
    //         }
    //     };

    // 安全使用严格模式的方法
    //1.全局范围 使用严格模式
    //2.把函数主题包裹在一个空的立即执行函数中
}


/**
 *  作者:Seven
 *  时间:2018/9/12 10:57
 *  Email:csz.seven@gmail.com
 *  描述:4.name属性
 */
{
    function fnName() {

    }

    console.log(`4.name属性 ${fnName.name} fnName`)

    console.log(`4.name属性 (new Function).name)= ${(new Function).name}`) // "anonymous"

    // foo.bind({}).name // "bound foo"
}


/**
 *  作者:Seven
 *  时间:2018/9/12 11:07
 *  Email:csz.seven@gmail.com
 *  描述:5.箭头函数
 */
{
    // 1.基本用法
    // ES6 允许使用“箭头”（=>）定义函数
    {
        let fn1 = v => v;

        // 等同于
        // let fn1= function (v) {
        //     return v;
        // };


        // 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
        // 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
        let fn2 = (n1, n2) => {
            return n1 + n2
        }


        // 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
        // 报错
        // let fn3 = p1 => {p1:p1 ,name:'fn3'}
        // 正确方式
        let fn3 = p1 => ({p1: p1, name: 'fn3'})

        //特殊情况
        // 由于引擎认为大括号是代码块，所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，因此实际执行的语句是1;
        let fn4 = () => {
            a:1
        }
        fn4() // undefined
        console.log(`let fn4 = () => {a:1}; fn4() 返回值为undefined`)

    }


    // 2.使用注意点
    {
        // 1.箭头函数this指向问题，就是定义时所在的对象，而不是使用时所在的对象.
        // 2.不能用于new的构造函数，使用会报错
        // 3.不可以使用arguments对象,该对象在函数体内不存在. 需要使用rest参数代替.
        // 4.不可以使用yield，箭头函数不是Generator函数.
        let id = 7;
        let fn = function () {
            //这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。
            setTimeout(() => {
                console.log(`5.箭头函数 this指向 ->id: ${this.id}`)
            },100)
        }
        // call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数
        // 和 apply() 方法类似，只有一个区别，就是call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组。
        fn.call({id: 77})
    }
}
