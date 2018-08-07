/**
 *  作者:Seven
 *  时间:2018/7/28 11:08
 *  Email:csz.seven@gmail.com
 *  描述:Generator 函数的语法
 */
// Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
// Generator 函数是一个状态机，封装了多个内部状态。
// Generator 函数除了状态机，还是一个遍历器对象生成函数。Generator 函数除了状态机，还是一个遍历器对象生成函数。

// Generator 函数是一个普通函数，但是有两个特征。
// 1.function关键字与函数名之间有一个星号
// 2.函数体内部使用yield表达式，定义不同的内部状态

/**
 *  作者:Seven
 *  时间:2018/7/28 11:19
 *  Email:csz.seven@gmail.com
 *  描述:实例1-Generator函数
 *  Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
 */
{
    function* helloWorldGenerator() {
        console.log('实例1-代码片段1')
        yield '实例1-1';

        console.log('实例1-代码片段2')
        yield '实例1-2';

        console.log('实例1-代码片段3')
        return '实例1-3';
    }

    let hw = helloWorldGenerator();

    console.log('yield1', hw.next())
    console.log('yield2', hw.next())
    console.log('yield3', hw.next())
    console.log('yield4', hw.next())
}


/**
 *  作者:Seven
 *  时间:2018/8/2 14:49
 *  Email:csz.seven@gmail.com
 *  描述:实例2-yield
 */
{
    // yield惰性求值,只有调用next方法才开始执行
    // *位置没有准确的标准

    // yield与return的区别:
    //  1.yield可以暂停运行，位置记录功能。return不具有位置记忆功能。
    //  2.function执行次数: yield多次 return单次
    function* f() {
        yield 7 + 7
    }

    // yield不能使用在普通函数
}


/**
 *  作者:Seven
 *  时间:2018/8/2 14:58
 *  Email:csz.seven@gmail.com
 *  描述:实例3-Generator函数不使用yield函数，单纯的暂停函数
 */
{
    function* f() {
        console.log('实例3-Generator暂停函数')
    }

    var generator = f();

    setTimeout(function () {
        generator.next()
    }, 2000)
}


/**
 *  作者:Seven
 *  时间:2018/8/2 15:10
 *  Email:csz.seven@gmail.com
 *  描述:实例4-yield表达式如果用在另一个表达式之中，必须放在圆括号里面
 */
{
    function* demo() {
        console.log('实例4 ' + (yield));
        console.log('实例4 ' + (yield 123))
    }

    let generator = demo()
}


/**
 *  作者:Seven
 *  时间:2018/8/2 15:15
 *  Email:csz.seven@gmail.com
 *  描述:实例5-Iterator接口关系
 */
{
    //Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给 对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
    let iterator = {};
    iterator[Symbol.iterator] = function* () {
        yield '实例5-1'
        yield '实例5-2'
        yield '实例5-3'
    }

    console.log([...iterator])

    // Generator函数返回遍历器对象,对象本身也具有Symbol.iterator属性，执行后返回自身。
    {
        function* gen() {

        }

        var g = gen()

        console.log('实例5 g === g[Symbol.iterator]', g === g[Symbol.iterator]());
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/2 15:27
 *  Email:csz.seven@gmail.com
 *  描述:实例6-next 方法的参数
 */
{
    // yield表达式总返回undefined，next方法可以带一个参数，该参数就会被当做上一个yield表达式的返回值.
    function* f() {
        for (let i = 0; true; i++) {
            let reset = yield  i;
            if (reset) {
                i = -1
            }
        }
    }

    let g = f();

    console.log('实例6-next', g.next()) // 0
    console.log('实例6-next', g.next()) // 1
    console.log('实例6-next', g.next(true)) // 0
    // 通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。
}


/**
 *  作者:Seven
 *  时间:2018/8/7 14:36
 *  Email:csz.seven@gmail.com
 *  描述:实例7-next 方法的参数
 */
{
    function* f1(x) {
        let y = 2 * (yield (x + 1));
        let z = yield (y / 3)
        return (x + y + z);
    }

    let a = f1(5)
    console.log('实例7-1', a.next()); // 6 done:false
    console.log('实例7-1', a.next()); // NaN done:false ->此时的y为undefined
    console.log('实例7-1', a.next()); // NaN done:true ->此时的y z 都为undefined

    let b = f1(5)
    console.log('实例7-2', b.next()); // 6 done:false
    console.log('实例7-2', b.next(12)); // 8 done:false -> 此时的y=2*12=24
    console.log('实例7-2', b.next(13)); // 42 done:true ->此时的z=13 y=24 x=5

    //ps:首次调用next 传值是无效的
}


/**
 *  作者:Seven
 *  时间:2018/8/7 14:52
 *  Email:csz.seven@gmail.com
 *  描述:实例8-next 方法的参数
 */
{
    //Generator 函数内部传值
    function* f2() {
        console.log('实例8 Started');
        console.log(`实例8 1. ${yield}`);
        console.log(`实例8 2. ${yield}`);
        return 'result';
    }

    let genObj = f2();

    genObj.next() // Started
    genObj.next('a')
    console.log('实例8 ',genObj.next('b'))
}


/**
 *  作者:Seven
 *  时间:2018/8/7 15:02
 *  Email:csz.seven@gmail.com
 *  描述:实例9-next 方法的参数
 *  实现第一次next调用，传递参数，可以再Generator在包裹一层
*/
{
    function wrapper(generatorFunction) {
        return function (...args) {
            let generatorObject = generatorFunction(...args);
            generatorObject.next();
            return generatorObject;
        }
    }

    const wrapped = wrapper(function* () {
        console.log(`Frist input: ${yield }`);
        return 'DONE'
    })

    console.log(wrapped().next(`实例9实现首次next传值`))

    // 书签🔖 ->如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
}
