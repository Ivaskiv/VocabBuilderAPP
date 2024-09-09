import styles from './styles.module.css';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import Statistics from '../common/Statistics';
import AddWordBtn from '../common/addWordButton/AddWordBtn';
import Filters from '../common/filter/Filters';
import Categories from '../../features/dictionary/categories/Categories';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_left}>
        <Filters />
        <Categories />
      </div>
      <div>
        <div className={styles.dashboard_right}>
          <Statistics />
          <AddWordBtn />
          <a href="/training">
            Train oneself <MdOutlineArrowRightAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
