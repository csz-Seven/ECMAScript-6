/**
 *  作者:Seven
 *  时间:2018/8/21 15:45
 *  Email:csz.seven@gmail.com
 *  描述:字符串的扩展
 *  ES6 加强了对 Unicode 的支持，并且扩展了字符串对象。
 */


/**
 *  作者:Seven
 *  时间:2018/8/21 15:45
 *  Email:csz.seven@gmail.com
 *  描述:1.字符串Unicode的表示法
 */
{
    // \u20BB7无法打印
    console.log("1.Unicode \\u20BB7 -> \u20BB7")
    // ES6改进 只要将码点放入大括号
    console.log("1.Unicode改进 \\u{} -> \u{20BB7}")

    //JavaScript6种字符表现形式
    {
        // '\z' === 'z'  // true
        // '\172' === 'z' // true
        // '\x7A' === 'z' // true
        // '\u007A' === 'z' // true
        // '\u{7A}' === 'z' // true
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/21 16:03
 *  Email:csz.seven@gmail.com
 *  描述:2.codePointAt()
 */
{
    // JavaScript内部，字符以UTF-16格式存储，每个字符固定2个字节.对于4字节的存储字符，JavaScript会认为是2个字符.

    let s = '𠮷'
    console.log('2.𠮷 length', s.length)
    // charAt无法读取
    console.log('2.𠮷 charAt(0)', s.charAt(0))
    console.log('2.𠮷 charAt(1)', s.charAt(1))
    // charCodeAt字符返回两个字节的值
    console.log('2.𠮷 charCodeAt(0)', s.charCodeAt(0))
    console.log('2.𠮷 charCodeAt(1)', s.charCodeAt(1))

    // ES6 codePointAt 能够处理4字节
    console.log('2.𠮷 codePointAt(0)', s.codePointAt(0))
    console.log('2.𠮷 codePointAt(1)', s.codePointAt(1))

}


/**
 *  作者:Seven
 *  时间:2018/8/21 16:39
 *  Email:csz.seven@gmail.com
 *  描述:3.String.fromCodePoint()
 */
{
    //ES5 String.fromCharCode 通过码点返回对应字符 ps：无法识别32位的UTF-16字符
    console.log(`3. ES5-fromCharCode 0x20BB7 ->`, String.fromCharCode(0x20BB7))

    // ES6能够识别大于0xFFFF的字符
    console.log(`3. ES5-fromCodePoint 0x20BB7 ->`, String.fromCodePoint(0x20BB7))

    //ps:fromCodePoint在String对象上  codePointAt在字符串实例对象上
}


/**
 *  作者:Seven
 *  时间:2018/8/21 16:45
 *  Email:csz.seven@gmail.com
 *  描述:4.字符串的遍历器接口
 */
{
    // 具备Iterator接口
    for (let codePoint of 'Iterator') {
        console.log(`4.字符串的遍历器接口 `, codePoint)
    }
    //ps:for循环无法识别这个码点 for...of能够正确识别出一个字符
}


/**
 *  作者:Seven
 *  时间:2018/8/22 14:06
 *  Email:csz.seven@gmail.com
 *  描述:5.normalize (n 正常化)
 */
{
    //许多欧洲语言有语调符号和重音符号
    // 一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）
    // '\u01D1'==='\u004F\u030C' // false 语义和视觉一样 JavaScript既然无法等价
    console.log(`5.normalize `, '\u01D1'.normalize() === '\u004F\u030C'.normalize());
}


/**
 *  作者:Seven
 *  时间:2018/8/22 14:11
 *  Email:csz.seven@gmail.com
 *  描述:6.includes(),startsWith(),endsWith()
 */
{
    // ES5
    // JavaScript 存在个indexOf方法，用来确定一个字符串是否包含另一个字符串中.

    //ES6新增 (返回布尔值) 支持第二参数，表示开始搜索的位置.
    //1.includes():表示是否找到了参数字符串.
    //2.startsWith():表示参数字符串是否在字符串的头部位置.
    //3.endsWith():表示参数字符串是否在字符串的尾部位置.

    let s = 'Seven'
    console.log(`6.s.includes('v')`, s.includes('v'))
    console.log(`6.s.startsWith('S')`, s.startsWith('S'))
    console.log(`6.s.endsWith('n')`, s.endsWith('n'))
}


/**
 *  作者:Seven
 *  时间:2018/8/22 14:18
 *  Email:csz.seven@gmail.com
 *  描述:7.repeat() (重复)
 *  表示将原字符串重复n遍
 */
{
    console.log(`7.repeat() 'A'.repeat(3) `, 'A'.repeat(3))
    console.log(`7.repeat() 'B'.repeat(0) `, 'B'.repeat(0))
    // 如果n为小数，则会被取整(向下取整)
    console.log(`7.repeat() 'C'.repeat(2.9) `, 'C'.repeat(2.9))
    // 如果n为负数，会触发报错
    // 如果n为 (-1,0] 则会被取整为-0 ，repeat视为0.
    try {
        console.log(`7.repeat() 'D'.repeat(-1) `, 'D'.repeat(-1))
    } catch (e) {
        console.warn(`报错 7.repeat() 'D'.repeat(-1) `)
    }
    // 参数NaN等同于0
    console.log(`7.repeat() 'D'.repeat(NaN) 等价于0`, 'D'.repeat(NaN))
    // 如果n为字符串时，先进行字符串的类型转为数字
    console.log(`7.repeat() 'E'.repeat('a') `, 'E'.repeat('a'))
    console.log(`7.repeat() 'F'.repeat('3') `, 'F'.repeat('3'))
}


/**
 *  作者:Seven
 *  时间:2018/8/22 14:30
 *  Email:csz.seven@gmail.com
 *  描述:8.padStart(),padEnd()
 *  ES2017引入字符串补全长度功能
 *  pad 填补
 */
{
    console.log(`8.padStart 's'.padStart(5,'sr')`, 's'.padStart(5, 'sr'))
    console.log(`8.padStart 's'.padEnd(5,'sr')`, 's'.padEnd(5, 'sr'))

    // 如果原字符串长度，等于大于最小长度，则返回原字符串
    console.log(`8.padStart 'seven'.padStart('s',5)`, 'seven'.padStart(5, 's'))
    console.log(`8.padStart 'seven'.padEnd('s',5)`, 'seven'.padEnd(5, 's'))

    // 如果原字符串 和 补全字符串，两者长度超过最小长度，则会截去超出位数的补全字符串.
    console.log(`8.padEnd '0'.padStart('123456789',9)`, '0'.padStart(9, '123456789'))

    // 如果省略第二参数，默认使用空格补全长度.
    console.log(`8.padEnd 's'.padEnd(5) 默认补全空格`, 's'.padEnd(5))

    // 提示字符串格式
    console.log(`8.padStart '08-22'.padStart(10,'YYYY-MM-DD')`,'08-22'.padStart(10,'YYYY-MM-DD'))
    // 需要完善
    console.log(`8.padStart '088-22'.padStart(10,'YYYY-MM-DD')`,'088-22'.padStart(10,'YYYY-MM-DD'))
}


/**
 *  作者:Seven
 *  时间:2018/8/23 10:55
 *  Email:csz.seven@gmail.com
 *  描述:9.matchAll()
 *  标记
*/
{}


/**
 *  作者:Seven
 *  时间:2018/8/23 10:55
 *  Email:csz.seven@gmail.com
 *  描述:10.模板字符串
*/
{

}
