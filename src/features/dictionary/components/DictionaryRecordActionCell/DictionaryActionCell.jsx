import styles from './styles.module.css';

import { useCallback, useRef } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useModalContext from '../../../../components/modals/useModalContext';
import { removeWord } from '../../../../infrastructure/utils/data';
import ModalProvider from '../../../../components/modals/ModalProvider';
import WordModal from '../../../../components/modals/WordModal';
import Popover from '../popover/Popover';
import { arrow, flip, offset, shift } from '@floating-ui/react-dom';
import { PopoverTrigger } from '../popover/PopoverTrigger';
import { PopoverContent } from '../popover/PopoverContent';
import { ArrowTooltip } from '../popover/ArrowTooltip';

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const { openModal } = useModalContext();
  const arrowRef = useRef(null);
  const handleEdit = useCallback(() => {
    openModal(
      <ModalProvider>
        <WordModal mode="edit" word={row.original} />
      </ModalProvider>
    );
  }, [openModal, row.original]);

  // const handleDelete = useCallback(async (wordId) => {
  //   try {
  //     await removeWord(wordId);
  //     onDeleteSuccess(wordId);
  //   } catch (error) {
  //     console.error('Error deleting word:', error);
  //   } finally {
  //     setIsPopoverOpen(false);
  //   }
  // }, [ onDeleteSuccess]);

  const handleDelete = useCallback(() => {
    try {
      removeWord(row.original.id);
      onDeleteSuccess(row.original.id);
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  }, [row.original.id, onDeleteSuccess]);

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
        <button className={styles.popover_btn} onClick={() => handleDelete(row.original.id)}>
          <RiDeleteBin6Line className={styles.icon_del} />
          Delete
        </button>
        <ArrowTooltip arrowRef={arrowRef} />
      </PopoverContent>
    </Popover>
  );
}
