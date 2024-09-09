import styles from './styles.module.css';
import { FaPlus } from 'react-icons/fa6';

const AddWordBtn = () => {
  return (
    <button className={styles.add_word_btn}>
      Add word <FaPlus className={styles.icon_add} />
    </button>
  );
};
export default AddWordBtn;
