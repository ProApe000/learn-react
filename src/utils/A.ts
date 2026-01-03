// console.log("A");
// import B from "./B";
// console.log("value B", B);
// console.log("A end");
// export default "valueA";

// import { bar } from "./B";
// console.log("a.mjs");
// console.log(bar);
// export let foo = "foo";

// import { bar } from "./B";
// console.log("a.mjs");
// console.log(bar);
// export let foo = "foo";

console.log('a 开始');
import { b } from './B';
export let a = 'original';
console.log('在 a 中，b =', b);
setTimeout(() => {
  console.log('在 a 中（延迟），b =', b);
}, 0);
a = 'changed';

// console.log("a 开始");
// import { b } from "./B";
// export let a = "original";
// console.log("在 a 中，b =", b);
// setTimeout(() => {
//   console.log("在 a 中（延迟），b =", b);
// }, 0);
// a = "changed";
