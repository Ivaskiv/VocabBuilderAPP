import BallMover from '../tasks/features/task1/BallMover';
import DispalyRundomValue from '../tasks/features/task2/DispalyRundomValue';
import styles from './styles.module.css';

export default function TestPage() {
  return (
    <div className={styles.testing_container}>
      <BallMover />
      <DispalyRundomValue />
    </div>
  );
}
