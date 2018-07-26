/**
 *  作者:Seven
 *  时间:2018/7/26 16:23
 *  Email:csz.seven@gmail.com
 *  描述:EMAScript 6 阮一峰（第三版) -Iterator 和 for...of 循环
 */


/**
 * Iterator 的作用有三个：
 * 一是为各种数据结构，提供一个统一的、简便的访问接口；
 * 二是使得数据结构的成员能够按某种次序排列；
 * 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
 * */

/**
 * 原生具备 Iterator 接口的数据结构如下。
 * Array
 * Map
 * Set
 * String
 * TypedArray
 * 函数的arguments 对象
 * NodeList 对象
 **/


/**
 *  作者:Seven
 *  时间:2018/7/26 16:38
 *  Email:csz.seven@gmail.com
 *  描述:实例1-模拟next方法的实现
 */
{
    var it = makeIterator(['a', 'b']);
    console.log(it.next())
    console.log(it.next())
    console.log(it.next())

    function makeIterator(array) {
        var nextIndex = 0;
        return {
            next: function () {
                return nextIndex < array.length ?
                    {value: array[nextIndex++], done: false} :
                    {value: undefined, done: false};
            }
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/7/26 16:57
 *  Email:csz.seven@gmail.com
 *  描述:实例2-无限循环next
 */
{
    var it = idMaker()
    console.log(it.next().value)
    console.log(it.next().value)
    console.log(it.next().value)

    function idMaker() {
        var index = 0;
        return {
            next: function () {
                return {value: '无限Next' + index++, done: false}
            }
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/7/26 17:29
 *  Email:csz.seven@gmail.com
 *  描述:实例3-Symbol.iterator
 */
{
    const obj = {
        [Symbol.iterator]: function () {
            return {
                next: function () {
                    return {
                        value: 1,
                        done: true
                    }
                }
            }
        }
    }
}


/**
 *  作者:Seven
 *  时间:2018/7/26 17:34
 *  Email:csz.seven@gmail.com
 *  描述:实例4-原生具备的数据结构
 */
{
    let arr = ['a', 'b', 'c'];
    let iter = arr[Symbol.iterator]();

    console.log('实例4', iter.next())
    console.log('实例4', iter.next())
    console.log('实例4', iter.next())
    console.log('实例4', iter.next())
}


/**
 *  作者:Seven
 *  时间:2018/7/26 17:45
 *  Email:csz.seven@gmail.com
 *  描述:实例5-对象手动增加Symbol.iterator属性
 *  类部署 Iterator 接口的写法
 */
{
    class RangeIterator {
        constructor(start, stop) {
            this.value = start;
            this.stop = stop;
        }

        [Symbol.iterator]() {
            return this;
        }

        next() {
            var value = this.value;
            if (value < this.stop) {
                this.value++;
                return {done: false, value: value}
            }
            return {done: true, value: undefined};
        }
    }

    function range(start, stop) {
        return new RangeIterator(start, stop)
    }

    // 此处使用for...of
    console.log('实例5 ', range(0, 3))
    for (var value of range(0, 3)) {
        console.log('实例5 ', value)
    }
}


/**
 *  作者:Seven
 *  时间:2018/7/26 17:59
 *  Email:csz.seven@gmail.com
 *  描述:实例6-对象手动增加Symbol.iterator属性
 *  通过遍历器实现指针结构
 */
{
    function Obj(value) {
        this.value = value
        this.next = null
    }

    Obj.prototype[Symbol.iterator] = function () {
        var iterator = {next: next};

        var current = this;

        function next() {
            if (current) {
                var value = current.value;
                current = current.next;
                return {done: false, value: value};
            } else {
                return {done: true}
            }
        }

        return iterator
    }

    var one = new Obj(1)
}
