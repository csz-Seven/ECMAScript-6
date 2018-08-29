/**
 *  作者:Seven
 *  时间:2018/8/28 15:34
 *  Email:csz.seven@gmail.com
 *  描述:数值的扩展
 */


/**
 *  作者:Seven
 *  时间:2018/8/28 15:35
 *  Email:csz.seven@gmail.com
 *  描述:1.二进制和八进制表示法
 */
{
    // ES6 二进制0b/0B 八进制0o/0O
    console.log(`0b111110111 === 503`, 0b111110111 === 503) // true
    console.log(`0o767 === 503`, 0o767 === 503) // true

    // 0b 0o转换为十进制使用Number
    Number('0b111')
}


/**
 *  作者:Seven
 *  时间:2018/8/28 15:40
 *  Email:csz.seven@gmail.com
 *  描述:2.Number.isFinite()、Number.isNaN()
 */
{
    //Number.isFinite()用来检查一个数值是否为有限的
    // 如果参数类型不是数值，Number.isFinite一律返回false
    // finite 有限的
    Number.isFinite(7); // true
    Number.isFinite(Infinity); // false

    // Number.isNaN()用来检查一个值是否为NaN。
    // 如果参数类型不是NaN，Number.isNaN一律返回false。
    Number.isNaN(NaN) // true
    Number.isNaN(7) // false

    // isFinite() isNaN() 与 Number.isFinite()、Number.isNaN()区别
    // isFinite() isNaN() 会进行数值的类型转换
}


/**
 *  作者:Seven
 *  时间:2018/8/28 15:45
 *  Email:csz.seven@gmail.com
 *  描述:3.Number.parseInt()、Number。parseFloat()
 */
{
    //ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。 目的 语言更模块化
    Number.parseInt('12.34') // 12
    Number.parseFloat('123.45#') // 123.45
}

/**
 *  作者:Seven
 *  时间:2018/8/28 15:47
 *  Email:csz.seven@gmail.com
 *  描述:4.Number.isInteger() Integer整数
 */
{
    console.log(`4.Number.isInteger() Number.isInteger(25)`, Number.isInteger(25))
    console.log(`4.Number.isInteger() Number.isInteger(25)`, Number.isInteger(25.1))

    // 如果参数不为数值 Number.isInterger返回false
    Number.isInteger()
    Number.isInteger(true)
    Number.isInteger(null)
    Number.isInteger('15')

    // JavaScript IEEE 754标准，数值存储为64位。
    // 精度超出时，超出的部分会丢失,Number.isInteger会出现误判的情况
    Number.isInteger(3.0000000000000002) // true

    //JavaScript最小值为Number.MIN_VALUE（5E-324）
    //超出最小值识别返回 自动转换为0
    Number.isInteger(5E-325) //true
}


/**
 *  作者:Seven
 *  时间:2018/8/29 10:28
 *  Email:csz.seven@gmail.com
 *  描述:5.Number.EPSILON
 */
{
    Number.EPSILON
    // 2.220446049250313e-16
}


/**
 *  作者:Seven
 *  时间:2018/8/29 10:32
 *  Email:csz.seven@gmail.com
 *  描述:6.安全整数和Number.isSafeInteger()
 */
{
    //JavaScript 能够准确表示的整数范围在   (-2^53,2^53)
    //用来判断一个整数是否落在这个范围之内。
    Number.isSafeInteger('a') // false
    Number.isSafeInteger(null) // false
    Number.isSafeInteger(NaN) // false
    Number.isSafeInteger(Infinity) // false
    Number.isSafeInteger(-Infinity) // false

    Number.isSafeInteger(9007199254740990) // true
    Number.isSafeInteger(9007199254740992) // false

    // 精度超出情况
    // 9007199254740993 === 9007199254740992 true
}


/**
 *  作者:Seven
 *  时间:2018/8/29 10:39
 *  Email:csz.seven@gmail.com
 *  描述:7.Math对象的拓展
 */
{
    // 7.1Math.trunc 去除小数 返回整数
    console.log(`7.Math.trunc(4.1)`, Math.trunc(4.1))
    console.log(`7.Math.trunc(4.9)`, Math.trunc(4.9))
    console.log(`7.Math.trunc(-4.1)`, Math.trunc(-4.1))
    console.log(`7.Math.trunc(-4.9)`, Math.trunc(4.9))
    console.log(`7.Math.trunc(-0.123)`, Math.trunc(-0.123))

    // 对于非数值 进行Number的类型转换
    Math.trunc('123.456') // 123
    Math.trunc(true) //1
    Math.trunc(false) // 0
    Math.trunc(null) // 0

    //空值和无法截取整数 统一返回NaN
    Math.trunc(NaN)
    Math.trunc('foo')
    Math.trunc()
    Math.trunc(undefined)


    // 7.2Math.sign (sign符号)
    // 判断 正负零
    // 非数值先进行Number转换
    // 正 +1  负 -1  0->0 -0 -> -0 其他值NaN(无法通过Number转换的值)
    Math.sign(-5) // -1
    Math.sign(5) // 1
    Math.sign(-0) //-0
    Math.sign(0) // 0
    Math.sign(NaN) //NaN
    Math.sign('')  // 0
    Math.sign(true)  // +1
    Math.sign(false)  // 0
    Math.sign(null)  // 0
    Math.sign('9')  // +1


    //7.3 Math.cbrt() 立方根
    Math.cbrt('8') //2

    // 7.4 Math.clz32() 返回一个数的 32 位无符号整数形式有多少个前导 0。
    Math.clz32(0) // 32

    // 7.5Math.imul()
    // 返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
    Math.imul(-1, 8)  // -8

    // 7.6Math.fround()方法返回一个数的32位单精度浮点数形式。

    // 7.7 Math.hypot() 参数的平方和的平方根

    // 7.8 对数相关
    // Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
    // Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
    // Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
    // Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。


    // 7.9 双曲函数
    // Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
    // Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
    // Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
    // Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
    // Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
    // Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
}


/**
 *  作者:Seven
 *  时间:2018/8/29 11:24
 *  Email:csz.seven@gmail.com
 *  描述:8.指数运算符
 */
{
    // ES6 ** 指数运算符
    console.log(`2**3=`, 2 ** 3)

    let a = 5
    a **= 2
    // a = a*a


    // V8引擎之间的差异
    // 指数运算符与Math.pow的实现不相同
    Math.pow(99, 99)
// 3.697296376497263e+197

    99 ** 99
// 3.697296376497268e+197
}
