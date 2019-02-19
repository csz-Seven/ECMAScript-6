/**
 *  作者:Seven
 *  时间:2019/2/11 17:37
 *  Email:csz.seven@gmail.com
 *  描述:Set和Map数据结构
 */
{
  // 1.Set
  // 基本用法

  // Set实例的属性和方法

  // 遍历操作

  // 2.WeakSet
  // 含义
  // 语法

  // 3.Map
  // 含义和基本用法
  // 实例的属性和操作方法

  // 4.WeakMap
  // 含义
  // WeakMap的语法
  // WeakMap的实例
  // WeakMap的用途
  {
    // Dom节点的存放 不存在内存泄漏问题。
    let element = document.getElementById('element');
    let weakMap = new WeakMap();

    weakMap.set(element, {clickNum: 0});
    element.addEventListener('click', function () {
      let elementData = weakMap.get(element)
      elementData.clickNum++;
    })
  }
}
