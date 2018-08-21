/**
 *  作者:Seven
 *  时间:2018/8/16 13:23
 *  Email:csz.seven@gmail.com
 *  描述:变量的结构赋值
 */
console.log('★★★  变量的结构赋值  ★★★')


/**
 *  作者:Seven
 *  时间:2018/8/16 13:24
 *  Email:csz.seven@gmail.com
 *  描述:实例1-基本用法
 */
{
    // 匹配模式 两边模式相同
    let [a, b, c] = [1, 2, 3]
    console.log('实例1-基本用法 a b c ', a, b, c)

    let [, , d] = [1, 2, 4]
    console.log('实例1-基本用法 d ', d)

    let [e, ...f] = [5, 6, 7, 8]
    console.log('实例1-基本用法 e ', e)
    console.log('实例1-基本用法 f ', f)

    // 结构不成功 变量的值为undefined
    let [g, h] = [9]
    console.log('实例1-基本用法 g ', g)
    console.log('实例1-基本用法 h ', h)

    // 不完全结构 左边模式 只匹配到一部分
    let [i, [j], k] = [10, [11, 12,], 13]
    console.log('实例1-基本用法 i ', i)
    console.log('实例1-基本用法 j ', j)
    console.log('实例1-基本用法 k ', k)

    // 等号的右边不是数组(不具备Iterator的)
    // 报错
    try {
        // 1.转换为对象后不具备Iterator
        let [f1] = 1;
        let [f2] = false;
        let [f3] = NaN;
        let [f4] = undefined;
        let [f5] = null;
        // 2.本身不具备Iterator
        let [f6] = {};
    } catch (e) {
        console.warn(`
        // 报错
        // 1.转换为对象后不具备Iterator
        let [f1] = 1;
        let [f2] = false;
        let [f3] = NaN;
        let [f4] = undefined;
        let [f5] = null;
        // 2.本身不具备Iterator
        let [f6] = {}; `)
    }

    // Set 结构 可以配合结构赋值使用
    {
        let [x, y, z] = new Set([1, 2, 3])
        console.log(`实例1-基本用法-Set x,y,z`, x, y, z)
    }

    // 本质:具备iterator 就可以使用结构赋值
    {
        function* fibs() {
            let a = 0;
            let b = 1;
            while (true) {
                yield a;
                [a, b] = [b, a + b]
            }
        }

        let [a, b, c, d, e, f, g, h] = fibs()
        console.log(`实例1-基本用法-Iterator接口 结构赋值 `, a, b, c, d, e, f, g, h)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/16 14:15
 *  Email:csz.seven@gmail.com
 *  描述:实例2-默认值
 *  解构赋值允许指定默认值
 */
{
    let [a = true] = []
    console.log(`实例2-默认值 a`, a)

    // ES6内部使用严格模式相等运算符 (===) 当严格等于 undefined时 默认值生效
    let [b, c = '触发默认值undefined'] = [1, undefined]
    console.log(`实例2-默认值 b c`, b, c)

    // 默认值为表达式时，表达式为惰性求值
    {
        function d() {
            console.log('aaa')
        }

        let [e = d()] = [];
        console.log(`实例2-默认值 表达式 e ${e}`)
    }

    // 默认值可以引入其他变量(已声明)
    let [f = 1, g = f] = []
    console.log(`实例2-默认值引入其他变量 f g`, f, g)
}


/**
 *  作者:Seven
 *  时间:2018/8/16 14:30
 *  Email:csz.seven@gmail.com
 *  描述:实例3-对象的结构赋值
 *  数组和对象结构的不同之处： 数组按次序赋值 对象变量必须和属性同名
 */
{
    let {a, b} = {a: 1, b: 2}
    let {c} = {z: 1}
    console.log('实例3-对象的结构赋值 a b c', a, b, c)

    // 变量名与属性名不一致时 写法
    {
        let {foo: baz} = {foo: 'aaa', bar: 'bbb'};
        baz // "aaa"

        let obj = {first: 'hello', last: 'world'};
        let {first: f, last: l} = obj;
        f // 'hello'
        l // 'world'
    }

    //对象的结构赋值是下面的简写
    {
        let {foo: foo, bar: bar} = {foo: 'a', bar: 'b'}
    }

    // 对象的结构赋值的内部机制，是先找到同名属性，然后在赋值对应的变量。
    //真正被赋值的是后者,而不是前者
    {
        let {foo: baz} = {foo: 'a', bar: 'b'}
        console.log(`实例3-对象的结构赋值baz foo`, baz)
    }

    //嵌套结构的对象
    {
        const node = {
            loc: {
                start: {
                    line: 1,
                    column: 5
                }
            }
        }

        let {loc, loc: {start}, loc: {start: {line}}} = node
        console.log(`实例3-对象的结构赋值loc,start,line`, loc, start, line)
    }

    // 对象结构指定默认值
    {
        let {x = '我是默认值'} = {}
        console.log(`实例3-对象的结构默认值`, x)

        // 默认值触发条件，对象的属性值严格等于 undefined
        let {y = '属性值为undefined'} = {x: undefined}
        let {z = '默认值'} = {z: null}
    }

    // 结构赋值失败 为undefined
    {
        let {foo} = {bar: 'bar'}
        console.log(`实例3-结构赋值失败`, foo)
    }

    //结构模式为 嵌套对象，且子对象所在所在的父属性不存在-报错
    {
        try {
            let {foo} = {bar: 'baz'};
            foo // undefined
        } catch (e) {

            //foo为undefined 则再取子属性就会报错
            console.warn(`结构模式为 嵌套对象，且子对象所在所在的父属性不存在-报错
            let {foo} = {bar: 'baz'};
            foo // undefined`)
        }
    }

    //已声明的变量用于结构赋值，出现报错，{x}解析为代码块，发生语法错误，只有不将大括号写在首行，才能解决该问题
    {
        let x;
        //    {x} = {x:1}
        ({x} = {x: 1})
        console.log(`实例3-使用已声明的变量 结构赋值x ${x}`)
    }

    // 数组本质是特殊的对象
    {
        let arr = [1, 2, 3];
        let {0: first, [arr.length - 1]: last} = arr
        console.log(`实例3-数组本质是特殊的对象first ${first} last ${last}`)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/21 11:09
 *  Email:csz.seven@gmail.com
 *  描述:实例4-字符串的结构赋值
 */
{
    // 字符串结构
    {
        const [a, b, c, d, e, f, g] = '字符串结构赋值'
        console.log(`实例4-`, a, b, c, d, e, f, g)
    }

    // 类似数组的对象具有length属性，可以对这属性进行数组结构
    {
        let {length: len} = '字符串结构'
        console.log(`实例4-length属性结构`, length)
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/21 11:14
 *  Email:csz.seven@gmail.com
 *  描述:实例5-数值和布尔值的结构赋值
 */
{
    // 数值和布尔值 会先转换为对象
    {
        let {toString: a} = 123;
        console.log(`实例5-数值 先转换为对象`, a === Number.prototype.toString)

        let {toString: b} = true;
        console.log(`实例5-布尔值 先转换为对象`, b === Boolean.prototype.toString)
    }

    // 等号右边不是数组和对象 ，就先将其转换为对象.
    // undefined 和 null 无法转为对象
}


/**
 *  作者:Seven
 *  时间:2018/8/21 11:24
 *  Email:csz.seven@gmail.com
 *  描述:实例6-函数参数的结构赋值
 */
{
    {
        function add([x, y]) {
            return x + y;
        }

        add([1, 2])
    }

    // 函数参数结构使用默认值-1
    {
        // x y 的参数的默认值
        function move1({x = 0, y = 0} = {}) {
            return [x, y]
        }

        console.log(`实例6-函数参数结构默认值-1 `, move1({x: 3, y: 8})) // [3,8]
        console.log(`实例6-函数参数结构默认值-1 `, move1({x: 3}))// [3,0]
        console.log(`实例6-函数参数结构默认值-1 `, move1({})) // [0,0]
        console.log(`实例6-函数参数结构默认值-1 `, move1()) // [0,0]
    }
    // 函数参数结构使用默认值-2
    {
        //move 传值参数的默认值
        function move2({x, y} = {x: 0, y: 0}) {
            return [x, y];
        }

        console.log(`实例6-函数参数结构默认值-2 `, move2({x: 3, y: 8})) // [3,8]
        console.log(`实例6-函数参数结构默认值-2 `, move2({x: 3})) // [3,undefined]
        console.log(`实例6-函数参数结构默认值-2 `, move2({})) // [undefined,undefined]
        console.log(`实例6-函数参数结构默认值-2 `, move2()) // [0,0]
    }
    //undefined就会触发函数参数的默认值
    {
        [1, undefined, 3].map((x = 'undefined的默认值') => console.log(`实例6-undefined触发函数默认值`, x));
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/21 14:20
 *  Email:csz.seven@gmail.com
 *  描述:实例7-圆括号问题
 */
{
    //不能使用圆括号的情况
    {
        //1.变量声明语句
        //let [(a)] = [1];
        //
        // let {x: (c)} = {};
        // let ({x: c}) = {};
        // let {(x: c)} = {};
        // let {(x): c} = {};
        //
        // let { o: ({ p: p }) } = { o: { p: 2 } };

        //2.函数参数
        // 报错
        // function f([(z)]) { return z; }
        // 报错
        // function f([z,(x)]) { return x; }

        //3.赋值语句模式
        // ({ p: a }) = { p: 42 };
        // ([a]) = [5];
    }

    // 使用圆括号的情况
    {
        // [(b)]=[3]
        // ({p:(d)}={})
        // [(parseInt.prop)] = [3]
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/21 14:54
 *  Email:csz.seven@gmail.com
 *  描述:实例8-结构赋值使用场景
 */
{
    // 交换变量的值
    {
        let x = 1;
        let y = 2;
        [x, y] = [y, x]
    }

    // 函数返回多个值时
    {
        let fn1 = function () {
            return [1, 2, 3];
        }
        let [a, b, c] = fn1
        ;
    }

    // 函数参数的定义
    {
        // 有序序列
        let fn1 = function ([x, y, z]) {
        }
        fn1([1, 2, 3])

        // 无序序列
        let fn2 = function ({x, y, z}) {
        }
        fn2({z: 1, y: 2, x: 3})
    }

    //提取JSON数据
    {
        let jsonData = {
            id: 42,
            status: "OK",
            data: [867, 5309]
        };
        let {id, status, data: number} = jsonData;
    }

    //函数参数默认值
    {
        // jQuery.ajax = function (url, {
        //     async = true,
        //     beforeSend = function () {},
        //     cache = true,
        //     complete = function () {},
        //     crossDomain = false,
        //     global = true,
        //     // ... more config
        // } = {}) {
        //     // ... do stuff
        // };
    }

    // 遍历Map结构
    {
        // const map = new Map();
        // map.set('first', 'hello');
        // map.set('second', 'world');
        //
        // for (let [key, value] of map) {
        //     console.log(key + " is " + value);
        // }
        // // first is hello
        // // second is world
    }

    // 模块指定输入哪些方法
    {
        // const {a,b} = require("model")
    }
}
