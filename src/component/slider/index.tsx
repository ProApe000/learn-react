import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from '@/routes';
import styles from './index.module.less';
const Slider: FC = () => {
  return (
    <div className={styles.slider}>
      {routes.map((route) => {
        return (
          <Link to={route.path} key={route.path} state={{ from: 'homePage' }}>
            Page{route.path.split('/').pop().toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
};

export default Slider;
