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
            const go=function *() {
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
*/
{

}
