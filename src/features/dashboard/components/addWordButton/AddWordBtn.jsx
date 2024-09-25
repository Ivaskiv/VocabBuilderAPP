import styles from './styles.module.css';

import { FaPlus } from 'react-icons/fa6';
import { forwardRef } from 'react';
import { ModalTrigger } from '../../../modals/components/ModalTrigger';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import AddWordFormModal from '../AddWordModal';

const AddWordBtn = forwardRef(function AddWordBtn(props, ref) {
  return (
    <ModalProvider>
      <ModalTrigger ref={ref} {...props}>
        Add word <FaPlus className={styles.icon_add} />
      </ModalTrigger>
      <AddWordFormModal />
    </ModalProvider>
  );
});

export default AddWordBtn;
