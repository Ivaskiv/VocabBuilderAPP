import styles from './styles.module.css';
import { FaPlus } from 'react-icons/fa6';
import Modal from '../../../modals/components/Modal';
import { useDialogContext } from '../../../modals/floatingUi/useDialogContext';

const AddWordBtn = () => {
  const { openModal } = useDialogContext();

  const handleOpenModal = () => {
    openModal(<Modal mode="add" />);
  };

  return (
    <button className={styles.add_word_btn} onClick={handleOpenModal}>
      Add word <FaPlus className={styles.icon_add} />
    </button>
  );
};
export default AddWordBtn;
