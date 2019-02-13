/**
 *  作者:Seven
 *  时间:2018/11/28 17:41
 *  Email:csz.seven@gmail.com
 *  描述:对象的新增方法
 */
let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});
