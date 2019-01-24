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

  //2.静态方法
  // 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被!!!实例!!!继承，而是直接通过类来调用，这就称为“静态方法”。
  {
    class case1 {
      static doSth1() {
        console.log('static静态方法')
      }
    }

    case1.doSth1()
    let newCase1 = new case1()
    try {
      newCase1.doSth1();
    } catch (e) {
      console.log('无法调用:->newCase1.doSth1()')
    }

    // 如果静态方法包含this关键字，这个this指的是类，而不是实例。
    class case2 {
      static doSth1() {
        //等价于 case2.doSth2()
        this.doSth2()
      }

      static doSth2() {
        console.log('case2.doSth2')
      }

      //doSth2 二者不一样
      doSth2() {
        console.log('实例.doSth2')
      }
    }

    case2.doSth2()

    // 静态方法虽然不会被！！！实例！！！继承，但是会被！！！子类！！！继承
    class case3 {
      static doSth1() {
        console.log('case3')
      }
    }

    class case3Child extends case3 {
    }

    case3Child.doSth1()

    //静态方法也是可以从super对象上调用的。
    class case4 {
      static doSth1() {
        console.log(`case4`)
      }
    }

    class case4Child extends case4 {
      static doSth1() {
        super.doSth1()
      }
    }

    case4Child.doSth1()
  }


  // 3.实例属性的新写法
  // 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
  {
    //实例属性this._count定义在constructor()方法里面。
    //另一种写法是，这个属性也可以定义在类的最顶层，其他都不变。
    // class case1{
    //   sth1 = "3.实例属性的新写法 case1";
    //   get doSth (){
    //     console.log(this.sth1)
    //   }
    // }
    // let newCase1 = new case1()
    // newCase1.doSth
  }

  // 4.静态属性
  // 静态属性指的是Class本身的属性,即Class.propName，而不是定义在实例对象(this)上的属性.
  {
    // 旧写法
    class case1 {
    }

    case1.sth = '4.静态属性 case1'
    console.log(case1.sth)

    // 新写法
    //提案-提供了类的静态属性，写法是在实例属性法的前面，加上static关键字。
    class case2 {
      static sth = '4.静态属性 case2'
    }

    console.log(case2.sth)
  }

  // 5.私有方法和私有属性
  {
    //现有的解决方案
    // 1.使用命名区分
    class case1 {
      doSth() {
      }

      //私用_
      _doSth() {
      }
    }

    // 2.因为模块内部的所有方法都是对外可见的,将私有方法移出模块
    {
      let doSth2 = function (v) {
        return this.v = v
      }

      class case2 {
        doSth1(v) {
          doSth2.call(this, v)
        }
      }
    }

    // 3.还有一种方法是利用Symbol值的唯一性,将私有方法的名字命名为Symbol值.

    // 私有属性的提案
    // 在属性前面增加 # 前缀
    // 私有属性，只能在类的内部使用,外部使用会报错.
    // 私有属性不限于从this引用，只要是在类的内部，实例也可以引用私有属性。
    // 私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法。
    class case4 {
      #sth = '5.私有属性 case4'

      #doSth() {
        console.log('5.私有方法 case4')
      }

      get value() {
        console.log(this.#sth);
      }
    }
  }

  // 6.new.target属性
  // new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
  // 如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
  {
    class case1 {
      constructor() {
        if (new.target === case1) {
          this.sth = '6.new.target属性 sth'
        } else {
          console.log('需使用new命令生成实例')
        }
      }
    }
    // new.target会被子类继承，此时的new.target是子类的构造函数.
  }
}
