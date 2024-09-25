import styles from './styles.module.css';
import AddWordModal from '../../../modals/addWordModal/AddWordModal';
import { FaPlus } from 'react-icons/fa6';
import { forwardRef } from 'react';
import Dialog from '../../../modals/components/Dialog';
import { DialogTrigger } from '../../../modals/components/DialogTrigger';

const AddWordBtn = forwardRef(function AddWordBtn({ onAddWord, ...props }, ref) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref} {...props}>
          Add word <FaPlus className={styles.icon_add} />
        </div>
      </DialogTrigger>
      <AddWordModal onAddWord={onAddWord} />
    </Dialog>
  );
});

export default AddWordBtn;
