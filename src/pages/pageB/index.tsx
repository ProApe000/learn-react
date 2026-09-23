import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from 'antd';
import { Person } from '@/common/classes/personClass';
import { supabase } from '@/utils/supabase';
const PageB: React.FC = () => {
  const [person, setPerson] = useState<Person | undefined>();
  const [count, setCount] = useState<number>(0);
  const fetchData = useCallback(async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: Array.from(new Set([1, 2, 3])) });
      }, 3000);
    });
  }, []);
  const signUP = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: '2977768973@qq.com',
        password: 'password123',
      });
      console.log('signup data', data, 'error', error);
    } catch (error) {
      console.log('signup error', error);
    }
  };
  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: '2977768973@qq.com',
        password: 'password123',
      });
      console.log('signin data', data, 'error', error);
    } catch (error) {
      console.log('signin error', error);
    }
  };
  const fetchDataFromDB = async () => {
    try {
      const { data, error } = await supabase
        .from('user_info')
        .select('*')
        .eq('first_name', 'test2');
      console.log('fetch data', data, 'error', error);
    } catch (error) {
      console.log('fetch error', error);
    }
  };
  useEffect(() => {
    setPerson(new Person('李四'));
  }, []);
  // const handleClick = () => {
  //   setCount((count) => count + 1);
  //   console.log('1', count);
  //   setTimeout(() => {
  //     setCount((count) => {
  //       console.log('2', count);
  //       return count + 1;
  //     });
  //     console.log('3', count);
  //   }, 0);
  // };
  // function handleClick() {
  //   setCount(1);
  //   console.log(count); // 旧值

  //   setTimeout(() => {
  //     setCount(2);
  //     console.log(count); // 新值？实际上是 1
  //     // 因为 setTimeout 里的 count 是闭包捕获的旧值
  //     // 这里的"同步"指的是 setState 立即执行，但打印的值受闭包影响
  //   }, 0);
  // }
  const handleClick = useCallback(() => {
    flushSync(() => {
      setCount((c) => c + 1);
    });
    // 此时 DOM 已更新，count 已是最新值
    console.log(count); // 打印旧值 因为闭包问题 handleClick是在某一个渲染中被创建的 它内部引用的count 是
    //那一次渲染时闭包捕获的常量值 flushSync 触发的重新渲染会生成一个新的handleClick
    console.log(document.querySelector('.count-text')?.textContent);
    flushSync(() => {
      setCount((c) => c + 1);
    });
    // 每次 flushSync 都会触发一次渲染（2次渲染）
  }, []);
  return (
    <>
      <div>
        pageB
        <Button onClick={fetchData}>获取数据</Button>
        <Button onClick={signUP}>用户注册</Button>
        <Button onClick={signIn}>用户登录</Button>
        <Button onClick={fetchDataFromDB}>查询数据</Button>
        <div>{person?.name}</div>
      </div>
      <div>
        React
        <Button onClick={handleClick}>
          按钮 数据<span className="count-text">{count}</span>
        </Button>
      </div>
    </>
  );
};

export default PageB;
