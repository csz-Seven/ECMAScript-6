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
 *  描述:实例19-Generator 向代理它的函数返回数据
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


/**
 *  作者:Seven
 *  时间:2018/8/13 14:21
 *  Email:csz.seven@gmail.com
 *  描述:实例20-Generator 向代理它的函数返回数据
 */
{
    function* genFuncWithReturn() {
        yield 'a';
        yield 'b';
        return 'The result';
    }

    function* logReturned(genObj) {
        let result = yield* genObj;
        console.log(`实例20 ${result}`)
    }

    console.log('实例20 ', [...logReturned(genFuncWithReturn())])
}


/**
 *  作者:Seven
 *  时间:2018/8/13 14:46
 *  Email:csz.seven@gmail.com
 *  描述:实例21-Generator yield* 取出嵌套数组的所有成员
 */
{
    function* iterTree(tree) {
        if (Array.isArray(tree)) {
            for (let i = 0; i < tree.length; i++) {
                yield* iterTree(tree[i]);
            }
        } else {
            yield tree;
        }
    }

    const tree = ['a', ['b', 'c'], ['d', 'e']];

    for (let x of iterTree(tree)) {
        console.log('实例21 ', x)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/13 15:20
 *  Email:csz.seven@gmail.com
 *  描述:实例22-yield* 遍历二叉树
 *  -标记-
 */
{
    //左树 当前节点 右树
    function Tree(left, label, right) {
        this.left = left;
        this.label = label;
        this.right = right;
    }

    // 左树 右树 使用yield*遍历
    function* inorder(t) {
        if (t) {
            yield* inorder(t.left)
            yield t.label;
            yield* inorder(t.right)
        }
    }

    // 生成二叉树
    function make(array) {
        if (array.length == 1) return new Tree(null, array[0], null)
        return new Tree(make(array[0]), array[1], make(array[2]));
    }

    let tree = make([
        [['a'], 'b', ['c']],
        'd',
        [['e'], 'f', ['g']]
    ])

    // 开发遍历二叉树
    let result = [];
    for (let node of inorder(tree)) {
        result.push(node)
    }

    console.log(`实例22 ${result}`)
}


/**
 *  作者:Seven
 *  时间:2018/8/14 13:51
 *  Email:csz.seven@gmail.com
 *  描述:实例23-Generator函数 作为对象属性
 */
{
    let obj = {
        * myGeneratorMethod() {
        }
    }

    // 等价于

    let obj2 = {
        myGeneratorMethod: function* () {
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/14 13:53
 *  Email:csz.seven@gmail.com
 *  描述:实例24-Generator函数的this指向
 */
{
    // Generator 函数返回遍历器，ES6规定这个遍历器是Generator 函数的实例，也继承Generator函数的prototype 对象上的方法。
    {
        function* g() {
        }

        g.prototype.hello = function () {
            return '实例24'
        }

        let obj = g();

        console.log('实例24 obj installed g', obj instanceof g)
        console.log(obj.hello())
    }

    // g当做普通的构造函数时,返回的是遍历器,返回的是遍历器对象，而不是this对象
    {
        function* g() {
            this.a = 24;
        }

        let obj = g();
        // console.log(obj.next())
        // console.log(obj.a)
    }

    // Generator 函数不能和 new 命令一起用
    {
        // function* F() {
        //     yield this.x=2;
        //     yield this.y=3;
        // }
        //
        // console.log(new F())
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/14 14:14
 *  Email:csz.seven@gmail.com
 *  描述: 实例25-实现内部this的 Generator函数(变通方法)
 *  方法1-使用call指向
 */
{
    function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }


    let obj = {}
    let f = F.call(obj)

    console.log('实例25 f', f.next())
    console.log('实例25 f', f.next())
    console.log('实例25 f', f.next())

    console.log('实例25 call->obj ', obj.a)
    console.log('实例25 call->obj ', obj.b)
    console.log('实例25 call->obj ', obj.c)

    // 使用call指向 Generator函数内部的this为obj，执行完所有yield后，内部属性都绑定在obj对象上,因此obj对象也就成了F实例.
}


/**
 *  作者:Seven
 *  时间:2018/8/14 14:24
 *  Email:csz.seven@gmail.com
 *  描述:实例26-实现内部this的 Generator函数(变通方法)
 *  方法2-绑定在F.prototype
 */
{
    function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }

    let f = F.call(F.prototype);

    console.log('实例26 f', f.next())
    console.log('实例26 f', f.next())
    console.log('实例26 f', f.next())

    console.log('实例26 call->F.prototype ', f.a)
    console.log('实例26 call->F.prototype ', f.b)
    console.log('实例26 call->F.prototype ', f.c)
}


/**
 *  作者:Seven
 *  时间:2018/8/14 14:33
 *  Email:csz.seven@gmail.com
 *  描述:实例27-Generator 实现new命令
 */
{
    function* gen() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }

    function F() {
        gen.call(gen.prototype)
    }

    let f = new F();
}


/**
 *  作者:Seven
 *  时间:2018/8/14 14:40
 *  Email:csz.seven@gmail.com
 *  描述:实例28-Generator 是实现状态机的最佳结构
 */
{
    {
        let ticking = true;
        let clock = function () {
            if (ticking)
                console.log('实例28状态机 Tick')
            else
                console.log('实例28状态机 Tock')

            ticking = !ticking;
        }
    }

    // 等价于 Generator
    {
        let clock = function* () {
            while (true) {
                console.log('实例28Generator实现状态机 Tick');
                yield;
                console.log('实例28Generator实现状态机 Tock')
                yield;
            }
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/14 14:52
 *  Email:csz.seven@gmail.com
 *  描述:Generator 协程
 *  -标记-
 */


/**
 *  作者:Seven
 *  时间:2018/8/14 15:52
 *  Email:csz.seven@gmail.com
 *  描述:实例29-Generator 应用场景
 */
{
    /**
     *  作者:Seven
     *  时间:2018/8/14 15:54
     *  Email:csz.seven@gmail.com
     *  描述:场景1 同步处理，异步操作
     */
    {
        //    AJAX
        function* main() {
            let reuslt = yield request("url")
            let resp = JSON.parse(reuslt)
            console.log(resp.value)
        }

        function makeAjaxCall(url, fn) {

        }

        function request(url) {
            makeAjaxCall(url, function (response) {
                it.next(response)
            })
        }

        var it = main();
        it.next();
    }

    /**
     *  作者:Seven
     *  时间:2018/8/14 16:31
     *  Email:csz.seven@gmail.com
     *  描述:场景2 控制流管理
     */
    {
        {
            // step1(function (value1) {
            //     step2(value1, function(value2) {
            //         step3(value2, function(value3) {
            //             step4(value3, function(value4) {
            //                 // Do something with value4
            //             });
            //         });
            //     });
            // });
        }

        // Promise实现
        {
            // Promise.resolve(step1)
            //     .then(step2)
            //     .then(step3)
            //     .then(step4)
            //     .then(function (value4) {
            //         // Do something with value4
            //     }, function (error) {
            //         // Handle any error from step1 through step4
            //     })
            //     .done();
        }

        // Generator 实现
        {
            // 只适用于 同步
            // function* longRunningTask(value1) {
            //     try {
            //         var value2 = yield step1(value1);
            //         var value3 = yield step2(value2);
            //         var value4 = yield step3(value3);
            //         var value5 = yield step4(value4);
            //         // Do something with value4
            //     } catch (e) {
            //         // Handle any error from step1 through step4
            //     }
            // }

            // scheduler(longRunningTask(initialValue));
            //
            // function scheduler(task) {
            //     var taskObj = task.next(task.value);
            //     // 如果Generator函数未结束，就继续调用
            //     if (!taskObj.done) {
            //         task.value = taskObj.value
            //         scheduler(task);
            //     }
            // }

            // for...of本质是while循环
            // {
            //     let it = iteratorJobs(jobs);
            //     let res = it.next();
            //
            //     while (!res.done) {
            //         let result = res.value;
            //         // ...
            //         res = it.next();
            //     }
            // }
        }


        // 部署Iterator接口
        {
            function* iterEntries(obj) {
                let keys = Object.keys(obj);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i]
                    yield [key, obj[key]];
                }
            }

            let myObj={foo:3,bar:7};

            for (let [key,value] of iterEntries(myObj)) {
                console.log('Generator 应用场景-部署Iterator接口 ',key,value)
            }
        }

        //数据结构
        {
            //Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
            // function* doStuff() {
            //     yield fs.readFile.bind(null, 'hello.txt');
            //     yield fs.readFile.bind(null, 'world.txt');
            //     yield fs.readFile.bind(null, 'and-such.txt');
            // }
        }
    }
}


// 标记：下面，利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。
