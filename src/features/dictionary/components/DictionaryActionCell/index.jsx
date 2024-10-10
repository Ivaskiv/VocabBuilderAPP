import { useState, useCallback } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import {
  FloatingFocusManager,
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import styles from './index.module.scss';
import { removeWord } from '../../../../infrastructure/utils/data.js';
import { useModalContext } from '../../../../infrastructure/modal/components/Modal/Dialog';

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { setOpen } = useModalContext();

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    middleware: [offset(4), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleEdit = useCallback(() => {
    setIsPopoverOpen(false);
    setOpen(true);
  }, [setOpen]);

  const handleDelete = useCallback(() => {
    try {
      const wordId = row.original.id;
      removeWord(wordId);
      onDeleteSuccess(wordId);
    } catch (error) {
      console.error('Error deleting word:', error);
    } finally {
      setIsPopoverOpen(false);
    }
  }, [row.original.id, onDeleteSuccess]);

  return (
    <div>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <IoIosMore />
      </button>
      {isPopoverOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className={styles.dictionary_popover}
            ref={refs.setFloating}
            style={floatingStyles}
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
    </div>
  );
}
