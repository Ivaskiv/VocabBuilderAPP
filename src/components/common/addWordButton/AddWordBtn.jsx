import { useContext } from 'react';
import styles from './styles.module.css';
import { FaPlus } from 'react-icons/fa6';
import ModalProvider, { ModalContext } from '../../modals/ModalProvider';
import WordModal from '../../modals/WordModal';

const AddWordBtn = () => {
  const { openModal } = useContext(ModalContext);

  const handleOpenModal = () => {
    openModal(
      <ModalProvider>
        <WordModal mode="add" />
      </ModalProvider>
    );
  };

  return (
    <button className={styles.add_word_btn} onClick={handleOpenModal}>
      Add word <FaPlus className={styles.icon_add} />
    </button>
  );
};
export default AddWordBtn;
