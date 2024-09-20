//DictionaryActionCell.jsx
import styles from './styles.module.css';
import Popover from '../popover/Popover';
import EditWordForm from '../../../forms/wordForm/components/EditWordForm';
import { useCallback, useRef } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeWord } from '../../../../infrastructure/utils/data';
import { arrow, flip, offset, shift } from '@floating-ui/react-dom';
import { PopoverTrigger } from '../popover/PopoverTrigger';
import { PopoverContent } from '../popover/PopoverContent';
import { ArrowTooltip } from '../popover/ArrowTooltip';
import { useDialogContext } from '../../../modals/floatingUi/useDialogContext';

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const arrowRef = useRef(null);
  const { openModal } = useDialogContext();

  const handleDelete = useCallback(() => {
    try {
      removeWord(row.original.id);
      onDeleteSuccess(row.original.id);
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  }, [row.original.id, onDeleteSuccess]);

  const handleEdit = () => {
    openModal(<EditWordForm initialValues={row.original} />);
  };

  return (
    <Popover middleware={[offset(10), flip(), shift(), arrow({ element: arrowRef })]}>
      <PopoverTrigger>
        <IoIosMore />
      </PopoverTrigger>
      <PopoverContent>
        <button className={styles.popover_btn} onClick={handleEdit}>
          <FiEdit2 className={styles.icon_edit} />
          Edit
        </button>
        <button className={styles.popover_btn} onClick={handleDelete}>
          <RiDeleteBin6Line className={styles.icon_del} />
          Delete
        </button>
        <ArrowTooltip arrowRef={arrowRef} />
      </PopoverContent>
    </Popover>
  );
}
