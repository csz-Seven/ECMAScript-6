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
