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
 */
{
    // 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
    const person = {
        sayName() {

        }
    }
    person.sayName.name // 'sayName'

    // 如果对象使用取值函数getter和存值函数setter，则name属性不是在改方法上，而是在get和set属性上面，返回 get/set + 方法名
    const obj = {
        get foo() {
        },
        set foo(x) {
        }
    }
    // obj.foo.name // TypeError: Cannot read property 'name' of undefined
    const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
    descriptor.get.name;// 'get foo'
    descriptor.set.name; // 'set foo'

    // 存在两种特殊情况 1.bind方法创造的函数 2.Function构造函数创造的函数
    (new Function()).name // 'anonymous'
    let doSth = function () {
    }
    doSth.bind().name; // 'bound doSth'

    // 如果对象的方法是Symbol值，那么name属性返回的是这个Symbol值的描述
    const key1 = Symbol('des');
    const key2 = Symbol();
    let obj2 = {
        [key1]() {
        },
        [key2]() {
        },
    }
    obj2[key1].name; // '[des]'
    obj2[key2].name; // ''
}


/**
 *  作者:Seven
 *  时间:2018/11/28 13:41
 *  Email:csz.seven@gmail.com
 *  描述:4.属性的可枚举性和遍历
 */
{
    // 可枚举性
    // 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
    let obj = {foo: 123};
    Object.getOwnPropertyDescriptor(obj, 'foo')
    // {value:123,writable:true,enumerable:true,configurable:true}

    //ES6 规定，所有 Class 的原型的方法都是不可枚举的。
    Object.getOwnPropertyDescriptor(class {
        foo() {
        }
    }.prototype, 'foo').enumerable  // false


    // 属性的遍历
    // ES6共有5种 可遍历对象属性的方法.
    // 1. for...in ,for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

    // 2. Object.keys(obj) ,Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

    // 3. Object.getOwnPropertyNames(obj) ,Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

    // 4. Object.getOwnPropertySymbols(obj) ,Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

    // 5. Reflect.ownKeys(obj) ,Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

    // 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
    //
    // 首先遍历所有数值键，按照数值升序排列。
    // 其次遍历所有字符串键，按照加入时间升序排列。
    // 最后遍历所有 Symbol 键，按照加入时间升序排列。
}


/**
 *  作者:Seven
 *  时间:2018/11/28 14:03
 *  Email:csz.seven@gmail.com
 *  描述:5.super关键字
 *  this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
 */
{
    let proto = {
        foo: 'hello'
    }
    let obj = {
        foo: 'world',
        find() {
            return super.foo;
        }
    }
    Object.setPrototypeOf(obj, proto)
    obj.find() // 'hello'

    // suoer关键字只能作用在对象的方法中，其余的地方都会报错
    // const obj1= {
    //     foo: super.foo,
    //     foo1: () => super.foo,
    //     foo2: function () {
    //         return super.foo
    //     }
    // }
}


/**
 *  作者:Seven
 *  时间:2018/11/28 14:18
 *  Email:csz.seven@gmail.com
 *  描述:6.对象的扩展运算符
 */
{
    // 解构赋值
    let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4}
    // x1 y2 z.a3 z.b4

    //解构赋值必须是最后一个参数
    // let {...a,b} = obj

    {
        // 一个实例
        // 扩展运算符的解构赋值，不能复制继承自原型对象的属性。
        let o1 = {a: 1};
        let o2 = {b: 2};
        o2.__proto__ = o1;
        let {...o3} = o2;
        o3 // {b:2}
        o3.a // undefined
    }

    {
        // 一个实例 解构赋值和扩展运算符区别
        const o4 = Object.create({c: 1, d: 2});
        o4.e = 3;
        let {c, ...newObj} = o4;
        let {d, e} = newObj
        c // 1
        d //undefined
        e // 3
    }


    //扩展运算符
    {
        // 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
        let z = {a: 3, b: 4}
        let n = {...z}
        n // {a:3,b:4}

        // 数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
        let foo = {...['a', 'b', 'c']}
        foo // {0:'a',1:'b',2:'c'}

        // 对象拓展运算符 等同于使用 Object.assign()方法
        // let aClone = {...a}
        // let aClone= Object.assign({},a)


        // 实现完整克隆的方法,拷贝对象原型的属性.
        //1.(__proto__属性在非浏览器的环境不一定部署)
        let obj = {a: 1}
        const clone1 = {
            __proto__: Object.getPrototypeOf(obj),
            ...obj
        }

        //2.
        const clone2 = Object.assign(
            Object.create(Object.getPrototypeOf(obj)),
            obj
        )

        //3.
        const clone3 = Object.create(
            Object.getPrototypeOf(obj),
            Object.getOwnPropertyDescriptors(obj)
        )

        // 扩展运算符可以用于合并多个对象
        // let ab = {...a,...b}
        // let ab = Object.assign({}, a, b)

        //如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
        //如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。

        // 对象的扩展运算符后面可以跟表达式。
        // const obj2 = {
        //     ...(x>1?{a:1}:{}),
        //     b:2
        // }

        //扩展运算符的参数是null或undefined，这两个值会被忽略，不会报错。
        let emptyObject = {...null, ...undefined}

        // 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的
    }
}
