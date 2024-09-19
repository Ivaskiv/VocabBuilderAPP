import BallMover from '../../../components/tasks/task1/BallMover';
import DispalyRundomValue from '../../../components/tasks/task2/DispalyRundomValue';
import styles from './styles.module.css';

export default function TestPage() {
  return (
    <div className={styles.testing_container}>
      <BallMover />
      <DispalyRundomValue />
    </div>
  );
}
