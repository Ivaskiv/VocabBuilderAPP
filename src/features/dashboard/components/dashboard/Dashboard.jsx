import styles from './styles.module.css';
import { MdArrowRightAlt } from 'react-icons/md';
// import Filters from '../common/filter/Filters';
import Statistics from '../statistics/Statistics';
import AddWordBtn from '../addWordButton/AddWordBtn';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_left}>{/* <Filters /> */}</div>
      <div>
        <div className={styles.dashboard_right}>
          <Statistics />
          <ModalProvider>
            <AddWordBtn />
          </ModalProvider>
          <a href="/training">
            Train oneself <MdArrowRightAlt />
          </a>
        </div>
      </div>
    </div>
  );
}
