import TestTrim from '../../utils';
import BallMover from '../tasks/features/task1/BallMover';
import Task2 from '../tasks/features/task2/Task2';
import styles from './styles.module.css';

export default function TestPage() {
  return (
    <div className={styles.testing_container}>
      <BallMover />
      <Task2 />
      <TestTrim />
    </div>
  );
}
