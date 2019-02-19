/**
 *  作者:Seven
 *  时间:2019/2/14 14:54
 *  Email:csz.seven@gmail.com
 *  描述:Proxy
 */
{
  // 1.概述
  // Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
  // Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
  // 中介~
  var obj = new Proxy({}, {
    get: function (target, key, receiver) {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    }
  })

  // Proxy支持13种拦截模式
  //get set has deleteProperty ownKeys getOwnPropertyDescriptor defineProperty preventExtensions getPrototypeOf isExtensible setPrototypeOf apply construct

  // 2.Proxy实例的方法
  // get()
}
