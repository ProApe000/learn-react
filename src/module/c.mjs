function fun() {
  console.log(this.name);
}

const obj = {
  name: 'Jack',
};
fun.call(obj);

Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  context = Object(context);

  const fnKey = Symbol('fn');
  context[fnKey] = this;
  const res = context[fnKey](...args);
  delete context[fnKey];
  return res;
};

Function.prototype.myBind = function (context, ...args) {
  const originFun = this;
  if (typeof originFun !== 'function') {
    throw new Error('Bind must be called on a function');
  }
  function bindFun(...callArgs) {
    const isNewCall = this instanceof bindFun;
    const finalContext = isNewCall ? this : context || globalThis;
    const allArgs = [...args, ...callArgs];
    return originFun.call(finalContext, ...allArgs);
  }
  // 原型链继承
  bindFun.prototype = Object.create(originFun.prototype);
  // 修正constructor
  bindFun.prototype.constructor = bindFun;
  return bindFun;
};

const fun1 = fun.myBind(obj);
fun1();
const obj2 = {
  name: 'Tom',
};
const fun2 = fun1.myBind(obj2);
fun2();

// getUser(function (err, user) {
//   if (err) {
//     console.error('获取用户失败', err);
//     return;
//   }

//   getOrders(user.id, function (err, orders) {
//     if (err) {
//       console.error('获取订单失败', err);
//       return;
//     }

//     getOrderDetail(orders[0].id, function (err, detail) {
//       if (err) {
//         console.error('获取订单详情失败', err);
//         return;
//       }

//       // ... 错误处理重复出现
//     });
//   });
// });

async function test() {
  console.log('A');
  await 42;
  console.log('B');
}
await test();
console.log('C');

// 输出：A → C → B
// 因为 await 后面的代码被放入微任务队列

function myNew(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new Error('请输入函数');
  }
  const obj = Object.create(constructor.prototype);
  const res = constructor.call(obj, ...args);
  const isObject =
    res !== null && (typeof res === 'object' || typeof res === 'function');
  return isObject ? res : obj;
}

// 实现深copy
function deepCopy(origin) {
  if (origin === null || origin === undefined) {
    return origin;
  }
  // 如果是数组
  if (Array.isArray(origin)) {
    const res = [];
    for (let i = 0; i < origin.length; i++) {
      res[i] = deepCopy(origin[i]);
    }
    return res;
  }
  if (typeof origin === 'object') {
    const res = {};
    for (let key of Object.keys(origin)) {
      res[key] = deepCopy(origin[key]);
    }
    return res;
  }
  return origin;
}

// 测试数据 1：基础类型
const test1 = {
  str: 'hello',
  num: 42,
  bool: true,
  nul: null,
  undef: undefined,
  sym: Symbol('test'),
  big: BigInt(9007199254740991),
};
console.log(deepCopy(test1));
// 测试数据 2：数组和对象嵌套
const test2 = {
  array: [1, 2, 3, 4, 5],
  object: { a: 1, b: 2, c: 3 },
  nested: {
    arr: [{ x: 1 }, { y: 2 }],
    obj: { deep: { value: 'deep' } },
  },
  mixed: [1, 'str', { key: 'val' }, [1, 2]],
};

// 期望：所有嵌套层级都被深拷贝，修改内层不影响原对象
// 期望：所有值完全复制，互不影响
console.log(deepCopy(test2));
// 测试数据 3：特殊对象类型
const test3 = {
  date: new Date('2024-01-01'),
  regex: /test/gi,
  map: new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]),
  set: new Set([1, 2, 3, 4, 5]),
  error: new Error('test error'),
  // 函数（通常不需要深拷贝，但要测试如何处理）
  func: function () {
    console.log('hello');
  },
  arrowFunc: () => {
    console.log('arrow');
  },
};

// 期望：Date、RegExp 等需要正确处理，Map/Set 需要恢复
console.log(deepCopy(test3));
