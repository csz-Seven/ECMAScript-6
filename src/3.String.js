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
    console.log(`3. ES5-fromCharCode 0x20BB7 ->`,String.fromCharCode(0x20BB7))

    // ES6能够识别大于0xFFFF的字符
    console.log(`3. ES5-fromCodePoint 0x20BB7 ->`,String.fromCodePoint(0x20BB7))

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
    for(let codePoint of 'Iterator'){
        console.log(codePoint)
    }
    //ps:for循环无法识别这个码点 for...of能够正确识别出一个字符
}
