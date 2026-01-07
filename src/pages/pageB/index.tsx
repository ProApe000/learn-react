import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { Person } from '@/common/classes/personClass';
const PageB: React.FC = () => {
  const [person, setPerson] = useState<Person | undefined>();
  const fetchData = useCallback(async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: Array.from(new Set([1, 2, 3])) });
      }, 3000);
    });
  }, []);
  useEffect(() => {
    setPerson(new Person('李四'));
  }, []);
  return (
    <div>
      pageB
      <Button onClick={fetchData}>获取数据</Button>
      <div>{person?.name}</div>
    </div>
  );
};

export default PageB;
