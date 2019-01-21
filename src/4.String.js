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
    console.log(`8.padStart '08-22'.padStart(10,'YYYY-MM-DD')`, '08-22'.padStart(10, 'YYYY-MM-DD'))
    // 需要完善
    console.log(`8.padStart '088-22'.padStart(10,'YYYY-MM-DD')`, '088-22'.padStart(10, 'YYYY-MM-DD'))
}


/**
 *  作者:Seven
 *  时间:2018/8/23 10:55
 *  Email:csz.seven@gmail.com
 *  描述:9.matchAll()
 *  标记
 */
{
}


/**
 *  作者:Seven
 *  时间:2018/8/23 10:55
 *  Email:csz.seven@gmail.com
 *  描述:10.模板字符串
 */
{

    //模板字符串的大括号内部，就是执行 JavaScript 代码

    // 普通字符串
    console.log(`10.模块字符串 In JavaScript '\\n' is a line-feed.`)

    // 多行字符串
    // 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
    // 去除换行,可以使用trim方法消除它.
    console.log(`10.模块字符串 In JavaScript this is
 not legal.`)

    // 字符串嵌入变量
    let name = 'Seven'
    console.log(`10.模块字符串 ${name}`)

    // ${} 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
    {
        let x = 1;
        let y = 2;
        console.log(`10.模块字符串 ${x} + ${y} = ${x + y}`)
    }

    // ${}内部允许调用函数
    {
        let fn = function () {
            return '${fn}'
        }
        console.log(`10.模块字符串 ${fn()}`)
    }

    // 引用模板字符串本身
    {
        // 1.
        let str = 'return' + '`10.模块字符串 ${name}-1`'
        let fn = new Function('name', str)
        console.log(fn('我是变量'))
    }
    {
        //2.
        let str = '(name) => `10.模块字符串 ${name}-2`'
        let fn = eval.call(null, str)
        console.log(fn('我是变量'))
    }
}


/**
 *  作者:Seven
 *  时间:2018/8/24 17:03
 *  Email:csz.seven@gmail.com
 *  描述:11.模板编译
 *  标记
 */
{
    let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
    // 生成类似的模板
    // 思路 转换为这样
    // echo('<ul>');
    // for(let i=0; i < data.supplies.length; i++) {
    //     echo('<li>');
    //     echo(data.supplies[i]);
    //     echo('</li>');
    // };
    // echo('</ul>');

    let compile = function (template) {
        const evalExpr = /<%=(.+?)%>/g;
        const expr = /<%([\s\S]+?)%>/g;

        template = template
            .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
            .replace(expr, '`); \n $1 \n  echo(`');

        template = 'echo(`' + template + '`);';

        let script = `(function () {
            let output = '';

            function echo(html) {
                output += html
            }

            ${template}
            
            return output;
        })`;

        return script;
    }

    let parse = eval(compile(template));
    // div.innerHTML = parse({supplies:['11.模板编译']})
}


/**
 *  作者:Seven
 *  时间:2018/8/25 14:34
 *  Email:csz.seven@gmail.com
 *  描述:12.标签模板
 */
{
    // 模板字符串，可以紧跟在一个函数后面,该函数被调用来处理这个模板字符串.
    {
        console.log`12.标签模板 console.log\`12.标签模板\``
        // alert`12`
        // 等价于
        // alert(12)
    }

    // 标签模板其实不是模板，而是函数调用的一种特殊形式.“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
    {
        let a = 7;
        let b = 77;

        // tag`Hello ${ a + b } world ${ a * b }`;
        // 等同于
        // tag(['Hello ', ' world ', ''], 15, 50);

        // tag函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。
    }

    // 参数按原样位置拼接
    {
        let passthru = function (literals) {
            let result = '';
            let i = 0;

            // （["The total is ", " (", " with tax)"], 30, 31.5）
            while (i < literals.length) {
                result += literals[i++];
                if (i < arguments.length) {
                    result += arguments[i]
                }
            }

            return result
        }
        let total = 30;
        let msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
        console.log(`12.标签模板 参数按原样位置拼接`, msg)
    }

    // rest参数写法
    {
        let passthru2 = function (literals, ...values) {
            let output = ''
            let index;
            console.log(`12.标签模板 参数按原样位置拼接 rest参数写法`, values)
            for (index = 0; index < values.length; index) {
                output += literals[index] + values[index];
            }
            output += literals[index]
            return output;
        }
        let total = 30;
        // let msg = passthru2`The total is ${total} (${total * 1.05} with tax)`;
    }

    // 应用之一：过滤HTML字符串，防止用户输入恶意内容.
    {
        let SaferHTML = function (templateDate) {
            let s = templateDate[0]
            for (let i = 1; i < arguments.length; i++) {
                let arg = String(arguments[i]);

                // 过滤标签
                s += arg.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                s += templateDate[i];
            }

            return s;
        }

        let sender = 'aaa'
        let message =
            SaferHTML`<p>${sender} has sent you a message.</p>`;
        console.log(`12.标签模板 过滤HTML  ${message}`)
    }

    // 应用之一：国际化语言处理
    {
        // i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
    }

    // 模板处理函数 raw属性 保存着转义后的字符串
    {

    }
}


/**
 *  作者:Seven
 *  时间:2018/8/28 15:18
 *  Email:csz.seven@gmail.com
 *  描述:String.raw()
 */
{
    //String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。
    String.raw`Hi\u000A!`;
    // 返回 "Hi\\u000A!"

    //如果原字符串的斜杠已经转义，那么String.raw会进行再次转义。
    String.raw`Hi\\n`
    // 返回 "Hi\\\\n"
}


/**
 *  作者:Seven
 *  时间:2018/8/28 15:32
 *  Email:csz.seven@gmail.com
 *  描述:模板字符串的限制
*/
