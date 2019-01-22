/**
 *  作者:Seven
 *  时间:2018/11/28 18:03
 *  Email:csz.seven@gmail.com
 *  描述:Class的基本语法
 */
{
  //1.简介
  {
    //1.1类的由来
    // ES5通过构造函数生成实例
    function case1(x, y) {
      this.x = x
      this.y = y
    }

    case1.prototype.toString = function () {
      return `(${this.x},${this.y})`
    }
    var newCase1 = new case1(7, 8)
    console.log('case1=>', newCase1.x, newCase1.y)

    // ES6加入Class(类),写法更像面向对象，更加清晰.
    // constructor为构造方法对应ES5的构造函数.
    // ps:类方法不需要加上function前缀，构造方法和类方法之间不能用逗号分隔.
    // 调用类的方法和ES5构造函数一致，使用new.
    class case2 {
      constructor(x, y) {
        this.x = x
        this.y = y
      }

      toString() {
        return `(${this.x},${this.y})`
      }
    }

    var newCase2 = new case2(7, 8)
    console.log('case2=>', newCase2.x, newCase2.y)

    // ES6中的class所有的方法包括constructor都是定义在prototype上
    // 类实例调用的方法，实际是调用原型链上的方法.
    class case3 {
      constructor() {
      }

      doSth1() {
      }

      doSth2() {
      }
    }

    // 等价于
    case3.prototype = {
      constructor() {
      },
      doSth1() {
      },
      doSth2() {
      }
    }

    // 因为类的方法是在prototype上的，在新增类的方法的时候，可以使用Object.assign()增加多种方法
    Object.assign(case3.prototype, {
      doSth3() {
      },
      doSth4() {
      }
    })

    // prototype对象的constructor指向的是类的本身
    console.log(`case3.prototype.constructor === case3 => ${case3.prototype.constructor === case3}`)

    // 用ES6 class类生成的所有方法 是不可枚举的
    class case4 {
      constructor(x, y) {
      }

      doSth1() {
      }
    }

    console.log('case4', Object.keys(case4.prototype))
    console.log('case4', Object.getOwnPropertyNames(case4.prototype))

    // 而在ES5中定义的构造函数方法 是可枚举的
    let case5 = function (x, y) {

    }
    case5.prototype.doSth1 = function () {

    }
    console.log('case5', Object.keys(case5.prototype))
    console.log('case5', Object.getOwnPropertyNames(case5.prototype))

    // 1.2constructor方法
    // ps:一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
    // constructor默认返回实例对象(this)，也可以手动变更为另外一个对象.
    class case6 {
    }

    // 等价于
    class case66 {
      constructor() {
      }
    }

    // 1.3类的实例
    // ps:与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上。类的所有实例共享一个原型对象。
    // 不推荐使用__proto__（游览器私有属性）修改属性，避免产生环境依赖.

    // 1.4取值函数(getter)存值函数(setter)
    // 用于拦截该属性的存取行为.
    // 存值函数和取值函数是设置在属性的 Descriptor 对象上.
    class case7 {
      get prop() {
        return 'case7'
      }

      set prop(value) {
        console.log('case7:' + value)
      }
    }

    let newCase7 = new case7()
    newCase7.prop = 77
    console.log(newCase7.prop)
    console.log(Object.getOwnPropertyDescriptor(case7.prototype, 'prop'))

    // 1.5属性表达式
    // 类的属性名可以是表达式
    let case8MethodName = 'doSth'

    class case8 {
      [case8MethodName]() {
      }
    }

    // 1.6Class表达式
    let case9 = class Me {
      getClassName() {
        return Me.name;
      }
    }
    let newCase9 = new case9()
    console.log(newCase9.getClassName())
    // Class表达式的特性可以写出立即执行的Class.
    let newCase10 = new class {
      constructor(name) {
        this.name = name
      }

      getName() {
        console.log(this.name)
      }
    }('case10')
    newCase10.getName()

    // 1.7注意点

    //.1严格模式
    //类和模块的内部，默认执行严格模式.

    //.2类不存在变量提升

    //.3类存在name属性,是因为Class实质是ES5构造函数的进一步封装。

    //.4可以有Generator方法

    //.5this的指向
    // 类方法的this默认指向实例.但是如果方法单独抽离出来使用，就存在报错的可能.
    class case11 {
      getName(name = 'case11') {
        this.print(name)
      }

      print(text) {
        console.log(text)
      }
    }

    let newCase11 = new case11()
    newCase11.getName()
    const {getName} = newCase11
    // getName() //此处会找不到this而报错
    //解决方案如下
    // 构造方法手动绑定this
    // 使用箭头函数，因为有this指向的特性.
    // 使用Proxy自动绑定this.
  }

}
