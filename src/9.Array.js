/**
 *  作者:Seven
 *  时间:2018/10/29 16:53
 *  Email:csz.seven@gmail.com
 *  描述:数组的扩展
 */


/**
 *  作者:Seven
 *  时间:2018/10/29 16:55
 *  Email:csz.seven@gmail.com
 *  描述:1.扩展运算符
 */
{
    // 含义
    // 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
    {
        console.log(`1.扩展运算符 console.log(...[1,2,3])  =>`, ...[1, 2, 3])

        // 主要用于函数调用
        // 如：
        const fn1 = function (array, ...item) {
            array.push(...item)
        }

        // 扩展运算符后面可以方式表达式
        const arr = [
            ...(1 > 0 ? ['a'] : []),
            'b'
        ]

        // 如果扩展运算符后面是个空数组，则产生任何效果
        // [...[],1]
        // [1]
    }


    // 替代函数apply方法
    {
        //  JavaScript 不提供求数组最大元素的函数
        // es5
        Math.max.apply(null, [1, 2, 3])

        // es6
        Math.max(...[2, 3, 77])
        // 等价于
        Math.max(2, 3, 77)


        //  JavaScript push不提供数组参数
        // es6
        const arr1 = [0, 1, 2, 3]
        const arr2 = [4, 5, 6, 7]
        arr1.push(...arr2)
    }


    // 扩展运算符的应用
    {
        // 1.复制数组
        {
            // es5
            const a1 = [1, 2]
            const a1New = a1.concat()
            //es6
            const a2 = [1, 2]
            const a2New = [...a2]
        }


        // 2.合并数组
        {
            const a1 = ['a', 'b']
            const a2 = ['c', 'd']
            const a3 = ['e']

            // es5
            a1.concat(a2, a3);

            // es6
            console.log(`1.扩展运算符 合并数组[...a1,...a2,...a3]`, [...a1, ...a2, ...a3])
        }


        // 3.与结构赋值结合
        // 将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
        {
            const [first, ...rest] = [1, 2, 3, 4, 5, 6, 7]
            console.log(`1.扩展运算符 结构赋值[first,...rest] = [1,2,3,4,5,6,7]`, first, rest)
        }


        // 4.字符串
        {
            console.log(`1.扩展运算符 字符串 [...'seven']`, [...'seven'])

            // 有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符
        }


        // 5.实现了Iterator接口的对象
        {
            // 任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
            // let nodeList = document.querySelectorAll('div');
            // let array = [...nodeList];
        }


        // 6.Map、Set结构，Generator函数
        // 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
        {
            // Map
            let map = new Map([
                [1, 'one'],
                [2, 'two'],
                [3, 'three'],
            ])
            let arr = [...map.keys()]
            console.log(`1.扩展运算符 Map [...map.keys()]`, [...map.keys()])

            // Generator
            const go = function* () {
                yield 1;
                yield 2;
                yield 3;
            }
            console.log(`1.扩展运算符 Generator `, [...go()])
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/10/30 14:30
 *  Email:csz.seven@gmail.com
 *  描述:2.Array.from()
 *  方法用于将1.类似数组的对象（array-like object）2.可遍历的对象（iterable）转换成真正的数组
 */
{
    let array = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    }

    //es5
    //slice() 方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变
    let arr1 = [].slice.call(array)

    //es6
    // 常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
    let arr2 = Array.from(array)

    // 只要部署了Iterator接口的数据结构
    Array.from('Iterator')

    let nameSet = new Set(['a', 'b'])
    Array.from(nameSet)


    // 扩展运算符（...）也可以将某些数据结构转为数组。
    // arguments、nodeList
    let fn1 = function () {
        const args = [...arguments]
    }

    // 扩展运算符内部调用的是（Symbol.iterator），如果没有则无法转换
    // Array.from支持转换类似数组的对象(任何有length属性的对象，都可以通过)
    Array.from({length: 3});

    // 兼容模式写法
    const toArray = (() => {
        Array.from ? Array.from : obj => [].slice.call(obj)
    })()

    // Array.from接受第二个参数,类似map方法，用于处理每个元素.
    Array.from([1, 2, 3], (x) => {
        return x * x
    })
}


/**
 *  作者:Seven
 *  时间:2018/11/23 15:51
 *  Email:csz.seven@gmail.com
 *  描述:3.Array.of()
 *  将一组值转换为数组
 */
{
    //Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
    Array.of(7, 2, 3)

    Array(3)
    Array(3, 7)

    // 实现写法
    const ArrayOf = function () {
        return [].slice().call(arguments)
    }
}

/**
 *  作者:Seven
 *  时间:2018/11/23 15:59
 *  Email:csz.seven@gmail.com
 *  描述:4.数组实例copyWithin()
 *  数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
 *  它接受三个参数。
 target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
 start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
 end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
 */
{
    [1, 2, 3, 4, 5].copyWithin(0, 3); // [4,5,3,4,5]
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4,2,3,4,5]
}


/**
 *  作者:Seven
 *  时间:2018/11/23 16:08
 *  Email:csz.seven@gmail.com
 *  描述:5.数组实例的find()和findIndex()
 */
{
    // 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
    // find((value,index,arr)=>{})
    [1, 4, -5, 10].find((value, index, arr) => value < 0); // [-5]

    // findIndex方法，返回第一个符合条件的数组成员位置,如果所有成员都不符合返回-1.
    [1, 4, -5, 10].findIndex((value, index, arr) => value < 0); // [2]

    //两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
    [1, 3, 4, 5, 6].find(function (v) {
        return v > this
    }, 3);  // 4

    //这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
    [NaN].indexOf(NaN);        // -1
    [NaN].findIndex(y => Object.is(NaN, y)); // 0
}


/**
 *  作者:Seven
 *  时间:2018/11/23 17:37
 *  Email:csz.seven@gmail.com
 *  描述:6.数组实例fill()
*/
