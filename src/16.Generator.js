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

        console.log('实例1-代码片段1')
        yield '实例1-2';

        console.log('实例1-代码片段1')
        return '实例1-3';
    }

    let hw = helloWorldGenerator();

    hw.next()
    hw.next()
    hw.next()

}
