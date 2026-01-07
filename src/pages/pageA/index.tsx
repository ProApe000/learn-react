import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { Person } from '../../common/classes/personClass';
import styles from './index.module.less';
const PageA: React.FC = () => {
  const location = useLocation();
  const [person, setPerson] = useState<Person | undefined>();
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
      <div>{person?.name}</div>
    </div>
  );
};

export default PageA;
