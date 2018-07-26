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
