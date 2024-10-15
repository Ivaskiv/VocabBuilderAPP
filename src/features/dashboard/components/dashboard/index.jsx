import { FiPlus } from 'react-icons/fi';
import styles from './index.module.scss';
import AddWordFormModal from '../addWordFormModal/AddWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';

export function Dashboard({ onClose }) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_left}></div>

      <div className={styles.dashboard_right}>
        <ModalProvider>
          <ModalTrigger>
            <div className={styles.add_word_btn}>
              Add word <FiPlus className={styles.icon_add} />
            </div>
          </ModalTrigger>
          <AddWordFormModal onClose={onClose} />
        </ModalProvider>
      </div>
    </div>
  );
}
