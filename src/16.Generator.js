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
    console.log('实例8 ', genObj.next('b'))
}


/**
 *  作者:Seven
 *  时间:2018/8/7 15:02
 *  Email:csz.seven@gmail.com
 *  描述:实例9-next 方法的参数
 *  实现第一次next调用，传递参数，可以再Generator在包裹一层
 */
{
    // 实现原理 内部先调用一次next()
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


/**
 *  作者:Seven
 *  时间:2018/8/8 10:38
 *  Email:csz.seven@gmail.com
 *  描述:实例10-Generator.prototype.throw()
 */
{
    let g = function* () {
        try {
            yield;
        } catch (e) {
            console.log(`实例10-内部throw ${e}`)
        }
    }

    let i = g();
    i.next()

    try {
        i.throw(`a`);
        i.throw(`b`)
    } catch (e) {
        console.log(`实例10-外部throw ${e}`)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/8 11:28
 *  Email:csz.seven@gmail.com
 *  描述:实例11-Generator.prototype.throw()
 *  内部未部署try...catch时，外部catch代码块捕获.
 *  内\外部都为部署try...catch时，程序则报错，中断执行.
 */
{
    let g = function* () {
        while (true) {
            yield;
            console.log(`内部捕获`, e)
        }
    }

    let i = g();
    i.next()

    try {
        i.throw('a')
        i.throw('b')
    } catch (e) {
        console.log('实例11 外部捕获', e)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/8 15:22
 *  Email:csz.seven@gmail.com
 *  描述:实例12-throw方法被捕获以后，会附带执行下一条yield(执行一次next方法)
 *  throw  g.throw互不影响
 */
{
    let gen = function* () {
        try {
            console.log(yield console.log('实例12-a next'));
        } catch (e) {

        }
        yield console.log('实例12-b throw')
        yield console.log('实例12-c')
    }

    let g = gen()
    g.next()
    g.throw()
    g.next()
}


/**
 *  作者:Seven
 *  时间:2018/8/8 15:48
 *  Email:csz.seven@gmail.com
 *  描述:实例13-throw方法
 *  Generator 执行过程中抛出 错误，且没有被内部捕获，就不会再执行下去
 */
{
    function* g() {
        yield 1;
        console.log('throwing an exception');
        throw new Error('generator broke!');
        yield 2;
        yield 3;
    }

    function log(generator) {
        let v;
        console.log('实例13-starting generator');

        try {
            v = generator.next()
            console.log(`实例13-第一次执行next`, v)
        } catch (e) {
            console.log(`实例13-1 捕获错误 `, v)
        }

        try {
            v = generator.next()
            console.log(`实例13-第二次执行next `, v)
        } catch (e) {
            console.log(`实例13-2 捕获错误 `, v)
        }

        try {
            v = generator.next()
            console.log(`实例13-第三次执行next `, v)
        } catch (e) {
            console.log(`实例13-3 捕获错误 `, v)
        }

        console.log('实例13-done')
    }

    log(g())
}


/**
 *  作者:Seven
 *  时间:2018/8/8 16:16
 *  Email:csz.seven@gmail.com
 *  描述:实例14-Generator.prototype.return(),可以返回给定的参数，并且终止遍历。
 *      如果return()不带参数，则返回undefined
 */
{
    function* gen() {
        yield 1;
        yield 2;
        yield 3;
    }

    let g = gen();

    console.log(`实例14-return()`, g.next())
    console.log(`实例14-return()`, g.return('return()方法'))
    console.log(`实例14-return()`, g.next())
}


/**
 *  作者:Seven
 *  时间:2018/8/8 16:22
 *  Email:csz.seven@gmail.com
 *  描述:实例15-Generator函数内部有 try...finally代码块，return则会推迟到finally代码执行后.
 */
{
    function* gen() {
        yield 1;
        try {
            yield 2;
            yield 3;
        } finally {
            yield 4;
            yield 5;
        }
        yield 6
    }

    let g = gen();

    console.log(`实例15 try...finally & return `, g.next()) //1
    console.log(`实例15 try...finally & return `, g.next()) //2
    console.log(`实例15 try...finally & return `, g.return(7))  //4
    console.log(`实例15 try...finally & return `, g.next()) //5
    console.log(`实例15 try...finally & return `, g.next()) //7
    console.log(`实例15 try...finally & return `, g.next()) //undefined
}


/**
 *  作者:Seven
 *  时间:2018/8/8 16:40
 *  Email:csz.seven@gmail.com
 *  描述:实例16-next() 、 throw() 、 return()共同点
 *  作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
 *  next()是将yield表达式替换成一个值。
 */
{
    let g = function* (x, y) {
        let result = yield x + y;
        return result
    }

    const gen = g(1, 2);
    console.log('实例16-next', gen.next())
    console.log('实例16-next', gen.next(1))
    // let result = yield x + y;
    // 替换成
    // let result = 1;
}


/**
 *  作者:Seven
 *  时间:2018/8/8 16:54
 *  Email:csz.seven@gmail.com
 *  描述:实例17-yield* 表达式
 */
{
    // 未使用yield*
    function* inner() {
        yield '实例17-1'
    }

    function* outer1() {
        yield '实例17-2';
        yield inner();
        yield '实例17-3';
    }

    let gen1 = outer1();
    console.log(gen1.next().value)//实例17-2
    console.log(gen1.next().value)// inner遍历器
    console.log(gen1.next().value)// 实例17-3

    // 使用yield
    function* outer2() {
        yield '实例17-4'
        yield* inner();
        yield '实例17-5'
    }

    let gen2 = outer2()
    console.log(gen2.next().value)// 17-4
    console.log(gen2.next().value)// 17-1
    console.log(gen2.next().value)// 17-4
}


/**
 *  作者:Seven
 *  时间:2018/8/10 14:38
 *  Email:csz.seven@gmail.com
 *  描述:实例18-何数据结构只要有 Iterator 接口，就可以被yield*遍历。
 */
{
    function* gen() {
        yield* ['a', 'b', 'c']
        yield* 'hello'
    }

    console.log(`实例18`, gen().next())
}


/**
 *  作者:Seven
 *  时间:2018/8/10 14:47
 *  Email:csz.seven@gmail.com
 *  描述:实例19-Generator 可以向代理它的函数返回数据
 */
{
    function* foo() {
        yield 2;
        yield 3;
        return 'foo';
    }

    function* bar() {
        yield 1;
        let v = yield* foo();
        console.log('实例19 v:' + v)
        yield 4;
    }

    let it = bar();

    console.log('实例19 ', it.next()) // 1
    console.log('实例19 ', it.next()) // 2
    console.log('实例19 ', it.next()) // 3
    console.log('实例19 ', it.next()) // v:foo 4
    console.log('实例19 ', it.next()) // undefined
}
