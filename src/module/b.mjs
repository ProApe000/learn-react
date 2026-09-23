import { count } from './a.mjs';
console.log(count); // 1
setTimeout(() => {
  console.log(count); // 100（✨ 实时反映变化）
}, 2000);
