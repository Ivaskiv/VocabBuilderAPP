import styles from './styles.module.css';

import { FaPlus } from 'react-icons/fa6';
import { forwardRef } from 'react';
import AddWordFormModal from '../addWordFormModal/AddWordFormModal';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import useModalContext from '../../../../infrastructure/modal/repository/useModalContext';

const AddWordBtn = forwardRef(function AddWordBtn(props, ref) {
  const { open: openModal } = useModalContext();
  const handleClick = () => {
    openModal(<AddWordFormModal />);
  };
  return (
    <>
      <ModalTrigger ref={ref} {...props}>
        <button type="button" onClick={handleClick} className={styles.add_word_btn}>
          Add word <FaPlus className={styles.icon_add} />
        </button>
      </ModalTrigger>
    </>
  );
});

export default AddWordBtn;
