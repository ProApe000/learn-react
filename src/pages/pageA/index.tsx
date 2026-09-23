import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { Person } from '../../common/classes/personClass';
import styles from './index.module.less';
import myImg from './asset/test-responsive-loader.jpg?sizes[]=300,sizes[]=600,sizes[]=1024';
import useCounter from '../../utils/hooks/useCount';
const PageA: React.FC = () => {
  const location = useLocation();
  const [person, setPerson] = useState<Person | undefined>();
  const { count, increment, decrement, reset } = useCounter(100);
  const {
    count: count2,
    increment: increment2,
    decrement: decrement2,
    reset: reset2,
  } = useCounter(200);
  console.log('pageA', location.state, location.search);
  const fetchData = useCallback(async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: Array.from(new Set([1, 2, 3])) });
      }, 3000);
    });
  }, []);
  useEffect(() => {
    setPerson(new Person('张三'));
  }, []);
  return (
    <div>
      pageA
      {/* <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/211eh7uldvhpeht/Group 1912057890.png" alt="" /> */}
      <div className={styles.myFont}>使用外部字体</div>
      <Button onClick={fetchData}>获取数据</Button>
      <div style={{ width: '600px' }}>
        <img
          width={'100%'}
          src={myImg.src}
          srcSet={myImg.srcSet}
          // sizes="(max-width:480px) 100vw, (max-width: 1024px) 100vw, 100vw"
          sizes="200px"
          alt=""
        />
      </div>
      <div>{person?.name}</div>
      <div>
        React
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={reset}>reset</Button>
        <div>{count}</div>
        React2
        <Button onClick={increment2}>+</Button>
        <Button onClick={decrement2}>-</Button>
        <Button onClick={reset2}>reset</Button>
        <div>{count2}</div>
      </div>
    </div>
  );
};

export default PageA;

// function fetchData(id) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve({ id, data: id });
//       } else {
//         reject(new Error('获取数据失败'));
//       }
//     }, 0);
//   });
// }
// // 要求实现一个批量重试函数 fetchDataBatch(ids,maxRetry)
// // 该函数接受一个ID数组和最大重试次数，返回一个Promise，
// // 针对每一个ID，尝试调用fetchData(id)，最多重试maxRetry次，如果重试maxRetry次仍然失败 返回 null
// // 当所有ID的数据都成功获取或重试次数超过最大次数时resolve，
// /**
//  * 样例
//  *  const res= await fetchDataBatch(ids,maxRetry)
//  *  console.log(res)
//  *  // 输出 Promise<array>([{id:1,data:1},null,{id:3,data:3}]) id 顺序与输入保持一致
//  *  // 或 失败信息
//  */
// // 我是这样实现的
// function fetchDataWithRetry(id, now, maxTry) {
//   if (now > maxTry + 1) {
//     return null;
//   }
//   return fetchData(id)
//     .then((res) => {
//       return res;
//     })
//     .catch(() => {
//       return fetchDataWithRetry(id, now + 1, maxTry);
//     });
// }
// async function fetchDataBatch(ids, maxRetry) {
//   const results = await Promise.all(
//     ids.map((id) => {
//       return fetchDataWithRetry(id, 1, maxRetry);
//     })
//   );
//   return results;
// }
// function MyApply(fn, obj, arr) {
//   if (typeof fn !== 'function') {
//     throw new Error('fn must be a function');
//   }
//   obj = obj === null ? globalThis : Object(obj);

//   const symbol = Symbol('fn');
//   obj[symbol] = fn;
//   try {
//     const res = obj[symbol](...arr);
//     delete obj[symbol];
//     return res;
//   } finally {
//     delete obj[symbol];
//   }
// }
// function MyBind(fn, obj, ...preAgrs) {
//   if (typeof fn !== 'function') {
//     throw new Error('fn must be a function');
//   }
//   function bound(...args) {
//     if (this instanceof bound) {
//       return new fn(...preAgrs, ...args);
//     }
//     const context =
//       obj === null || obj === undefined ? globalThis : Object(obj);
//     return fn.apply(context, [...preAgrs, ...args]);
//   }
//   if (fn.prototype) {
//     bound.prototype = Object.create(fn.prototype);
//     bound.prototype.constructor = bound;
//   }
//   return bound;
//   // return (...arg) => MyApply(fn, obj, [...preAgrs, ...arg]);
// }
// // 寄生式组合继承
// class Parent {
//   constructor(name) {
//     this.name = name;
//   }
//   sayName() {
//     console.log(this.name);
//   }
// }
// Parent.prototype.sayName = function () {
//   console.log(this.name);
// };
// class Child {
//   constructor(name, age) {
//     Parent.call(this, name);
//     this.age = age;
//   }
//   sayAge() {
//     console.log(this.age);
//   }
// }
// Child.prototype = Object.create(Parent.prototype);
// const child = new Child('张三', 18);
// child.sayName();
// child.sayAge();
