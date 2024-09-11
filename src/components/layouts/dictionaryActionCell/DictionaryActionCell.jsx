import { useState, useCallback } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EditWordForm from '../../forms/wordForm/EditWordForm';
import axios from 'axios';
import {
  FloatingFocusManager,
  FloatingPortal,
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import styles from './styles.module.css';

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    middleware: [offset(4), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleEdit = () => {
    setIsEditOpen(true);
    setIsPopoverOpen(false);
  };

  const handleDelete = useCallback(async () => {
    try {
      const wordId = row.original.id;
      await axios.delete(`/words/${wordId}`);
      onDeleteSuccess(wordId);
      setIsPopoverOpen(false);
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  }, [onDeleteSuccess, row.original.id]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        <IoIosMore />
      </button>

      <FloatingPortal>
        {isPopoverOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={styles.dictionary_popover}
              {...getFloatingProps()}
            >
              <button onClick={handleEdit}>
                <FiEdit2 />
                Edit
              </button>
              <button onClick={handleDelete}>
                <RiDeleteBin6Line />
                Delete
              </button>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
      <FloatingPortal>
        {isEditOpen && <EditWordForm word={row.original} onClose={() => setIsEditOpen(false)} />}
      </FloatingPortal>
    </>
  );
}
