/**
 *  作者:Seven
 *  时间:2018/8/15 10:48
 *  Email:csz.seven@gmail.com
 *  描述:let 和 const命令
 */


/**
 *  作者:Seven
 *  时间:2018/8/15 10:57
 *  Email:csz.seven@gmail.com
 *  描述:实例1-let const作用域
 */
{
    {
        var a = [];
        for (var i = 0; i < 10; i++) {
            a[i] = function () {
                console.log(`实例1 var声明 ${i}`)
            }
        }
        a[7]()
    }

    {
        var a = [];
        //所以每一次循环的i其实都是一个新的变量
        //JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算
        for (let i = 0; i < 10; i++) {
            a[i] = function () {
                console.log(`实例1 let声明 ${i}`)
            }
        }
        a[7]()
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/15 11:02
 *  Email:csz.seven@gmail.com
 *  描述:实例2-for循环
 *  1.设置循环变量的那部分是一个父作用域
 *  2.循环体内部是一个单独的子作用域
 */
{
    // 父作用域 ↓↓↓↓↓
    for (let i = 0; i < 3; i++)
        // 子作用域 ↓↓↓↓↓
    {
        let i = '实例2 for循环的作用域区分';
        console.log(i)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/15 11:08
 *  Email:csz.seven@gmail.com
 *  描述:不存在变量提升
 */
{
    console.log(foo)
    var foo = 2;

    //报错ReferenceError
    console.log(bar)
    let bar = 2;
}


/**
 *  作者:Seven
 *  时间:2018/8/15 11:18
 *  Email:csz.seven@gmail.com
 *  描述:实例3-暂时性死区（temporal dead zone,TDZ）
 *  块级作用域内存在let和const命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
 */
{
    {
        var tmp = '实例3'

        if (true) {
            tmp = '实例3-暂时性死区'
            let tmp;
            console.log(tmp)
        }
    }

    {
        // function bar(x = y, y = 2) {
        //     return [x, y];
        // }
        //
        // bar(); // 报错
    }

    {
        {
            // 不报错
            var x = x;

        }
        {
            // 报错
            let x = x;
            // ReferenceError: x is not defined
        }
    }
    //ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。
}


/**
 *  作者:Seven
 *  时间:2018/8/15 11:27
 *  Email:csz.seven@gmail.com
 *  描述:实例4-不允许重复声明
 */
{
    {
        function func(arg) {
            // let arg; // 报错
        }
    }

    {
        function func(arg) {
            {
                let arg; // 报错
            }
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/15 13:35
 *  Email:csz.seven@gmail.com
 *  描述:实例5-块级作用域
 */
{
    //ES5 只有全局作用域和函数作用域，没有块级作用域
    {
        var tmp = new Date();

        function f() {
            console.log(tmp);
            if (false) {
                // 此处重新声明了tmp
                var tmp = '实例5'
            }
        }

        f();
    }

    // var变量泄露为全局变量
    {
        var s = '实例5'
        for (var i = 0; i < s.length; i++) {

        }
        console.log('实例5 变量泄露', i)
    }

    //ES5块级作用域
    {
        (function () {
            var tmp = 'something'
        }());
    }
    //ES6块级作用域
    {
        function f1() {
            let n = '实例5-es6块级外部';
            if (true) {
                let n = '实例5-es6块级内部'
            }
            console.log(n)
        }

        f1()
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/15 13:56
 *  Email:csz.seven@gmail.com
 *  描述:实例6-块级作用域 & 函数作用域
 *  ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
 */
{
// 游览器环境导致的行为差异太大,应该避免在块级作用域内声明函数.
    function f() {
        console.log('I am outside!');
    }

    (function () {
        if (false) {
            // 重复声明一次函数f
            function f() {
                console.log('I am inside!');
            }
        }

        f();
    }());
}


/**
 *  作者:Seven
 *  时间:2018/8/15 14:40
 *  Email:csz.seven@gmail.com
 *  描述:实例7-const命令
 */
{
    //const声明一个只读常量，声明后，常量的值不能被改变
    {
        const seven = 7;
        // "seven" is read-only
        // seven = 8;
    }

    //const声明需要立即初始化，不能留在以后赋值
    {
        // 报错
        // const foo;
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/15 14:48
 *  Email:csz.seven@gmail.com
 *  描述:实例8-const本质
 *  const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
 *  1.简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
 *  2.复合类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，const是指针固定不变，至于数据结构是否变化是无法控制的.
 */
{
    {
        const foo = {}
        foo.prop = '实例8-const本质'
        console.log(foo.prop)

        //报错
        // foo={}
    }

    {
        const a = [];
        a.push('实例8')
        a.length = 0;
        // 报错
        // a = ['Dave']
    }


    // 如果需要保证const的复合类型不被改变 使用Object.freeze冻结对象
    {
        const foo = Object.freeze({});
        // 报错
        // foo.prop='freeze'
    }
    // 完整冻结一个对象
    {
        // 回调冻结
        let constantize = (obj) => {
            Object.freeze(obj)
            Object.keys(obj).forEach((key, i) => {
                if (typeof obj[key] === 'object') {
                    constantize(obj[key])
                }
            })
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/15 16:15
 *  Email:csz.seven@gmail.com
 *  描述:ES6中的 6种声明变量方法
 *  1.var
 *  2.function
 *  3.let
 *  4.const
 *  5.import
 *  6.class
 */


/**
 *  作者:Seven
 *  时间:2018/8/15 16:32
 *  Email:csz.seven@gmail.com
 *  描述:实例9-顶层对象的属性
 */
{
    //顶层对象
    // 1.游览器环境 window
    // 2.Node global
    // ES5中全局变量等价于顶层对象
    window.seven = 7;
    console.log('实例9 全局变量seven ', seven)
    console.log(`实例9 顶层对象window.seven `, seven)

    // ES6中的改变
    // var function声明的全局变量 依然保留在顶层对象的属性
    // let const class声明的全局变量 已脱离顶层对象的属性
}


/**
 *  作者:Seven
 *  时间:2018/8/15 17:49
 *  Email:csz.seven@gmail.com
 *  描述:实例10-global对象
 */
{
    //ES5中顶层对象的不统一
    //1.游览器顶层对象 window，Node 和 Web Worker没有window
    //2.游览器和Web Worker里面，self指向顶层对象，Node没有self
    //3.Node的顶层对象为global，其他环境没有

    //目前解决各种环境都能取到顶层对象，使用this
    //this指向问题
    //1.全局环境this返回顶层对象。Node模块和ES6模块，this返回当前模块
    //2.函数不作为对象运行时，this指向顶层对象.ps严格模式下，this返回undefined
    //3.不管严格模式，还是普通模式,new Function('return this')(),总是返回全局对象。
    //如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。

    //解决顶层对象方案
    //1.引入global对象---system.global.
    //2.方案二
    {
        (typeof window !== "undefined"
            ? window
            : (typeof process === 'object' &&
                typeof require === "function" &&
                typeof global === 'object')
                ? global
                : this);

        let getGlobal = function () {
            if (typeof self !== 'undefined') {
                return self
            }
            if (typeof window !== "undefined") {
                return window
            }
            if (typeof global !== "undefined") {
                return global
            }
            throw new Error('???')
        }
    }
}
