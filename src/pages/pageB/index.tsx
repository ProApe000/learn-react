import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { Person } from '@/common/classes/personClass';
import { supabase } from '@/utils/supabase';
const PageB: React.FC = () => {
  const [person, setPerson] = useState<Person | undefined>();
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
  return (
    <div>
      pageB
      <Button onClick={fetchData}>获取数据</Button>
      <Button onClick={signUP}>用户注册</Button>
      <Button onClick={signIn}>用户登录</Button>
      <Button onClick={fetchDataFromDB}>查询数据</Button>
      <div>{person?.name}</div>
    </div>
  );
};

export default PageB;
