// console.log("B");
// export default "valueB";

// import { foo } from "./A";
// console.log("b.mjs");
// console.log(foo);
// export let bar = "bar";

// import { foo } from "./A";
// console.log("b.mjs");
// // 延迟访问foo，例如在函数中
// export let bar = "bar";
// export function getFoo() {
//   return foo;
// }

console.log("b 开始");
import { a } from "./A";
export let b = "original";
console.log("在 b 中，a =", a);
setTimeout(() => {
  console.log("在 b 中（延迟），a =", a);
}, 0);
b = "changed";

// console.log("b 开始");
// import { a } from "./A";
// export let b = "original";
// console.log("在 b 中，a =", a);
// setTimeout(() => {
//   console.log("在 b 中（延迟），a =", a);
// }, 0);
// b = "changed";
