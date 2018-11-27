/**
 *  作者:Seven
 *  时间:2018/11/27 17:25
 *  Email:csz.seven@gmail.com
 *  描述:10.对象的拓展
 */


/**
 *  作者:Seven
 *  时间:2018/11/27 17:26
 *  Email:csz.seven@gmail.com
 *  描述:1.属性的简洁表示法
 *  ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
 */
{
    const foo = 'bar'
    const baz = {foo}
    // 等价于
    const baz2 = {foo: foo}

    let fn = function (x, y) {
        return {x, y}
    }
    let fn2 = function (x, y) {
        return {x: x, y: y}
    }

    // 方法简写
    const o = {
        method() {
            return 'fn'
        }
    }
    //等价于
    const o2 = {
        method: function () {
            return 'fn'
        }
    }

    // !!!简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果!!!
    const obj = {
        class() {
        }
    }
    // 等价于
    const obj2 = {
        'class': function () {

        }
    }

    // Generator 函数
    const obj3 = {
        * method() {

        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/11/27 17:50
 *  Email:csz.seven@gmail.com
 *  描述:2.属性表达式
 */
{
    //定义对象属性 存在两种方法.
    //1.标识符作为属性名
    let obj = {};
    obj.foo = true;
    //2.表达式作为属性名
    obj['f' + 'oo2'] = true;

    // 字面量方式定义对象({})
    //ES5 只存在一种方法
    // 1.标识符作为属性名
    let obj2 = {
        foo: true,
        foo2: true
    }
    // ES6 增加+ 表达式作为属性名
    let key = 'foo'
    let obj3 = {
        [key]: true,
        ['f' + '002']: true
    }

    // 一个实例
    let lastWord = 'last word'
    const obj4 = {
        'first word': 'hello',
        [lastWord]: 'seven'
    }
    obj4['first word'] // 'hello'
    obj4[lastWord] // 'seven'
    obj4['last word'] // 'seven'


    // !!!属性名表达式与简洁表示法，不能同时使用，会报错!!!
    // const foo = 'bar';
    // const bar = 'abc';
    // const baz = { [foo] };

    // 正确示范
    // const foo = 'bar';
    // const baz = { [foo]: 'abc'};


    //！！！属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]！！！
    const keyA = {a: 1}
    const obj5 = {
        [keyA]: 'valueA'
    }
    obj5 // Object {[object object]: 'valueA'}
}


/**
 *  作者:Seven
 *  时间:2018/11/27 18:19
 *  Email:csz.seven@gmail.com
 *  描述:3.方法的name属性
 *  函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
 */
