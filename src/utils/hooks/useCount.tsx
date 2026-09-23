import { useState } from 'react';

// 自定义Hook返回函数
function useCounter(initialCount = 0) {
  console.log('useCounter', initialCount);
  const [count, setCount] = useState(initialCount);
  return {
    count,
    increment: () => setCount((c) => c + 1), // 返回函数
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(initialCount),
  };
}
export default useCounter;
