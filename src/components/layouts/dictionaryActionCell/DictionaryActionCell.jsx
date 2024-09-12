import { useState, useCallback } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
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
import styles from './styles.module.css';
import { useModal } from '../../modals/ModalProvider';
import EditWordModal from '../../modals/EditWordModal/EditWordModal';

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const { openModal, closeModal } = useModal();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    middleware: [offset(4), flip(), shift()],
  });

  const click = useClick(context || {});
  const dismiss = useDismiss(context || {});
  const role = useRole(context || {});
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleEdit = () => {
    setIsPopoverOpen(false);
    openModal({
      title: 'Edit Word',
      subtitle: `Editing word: ${row.original.word}`,
      children: (
        <EditWordModal
          word={row.original}
          onSuccess={() => {
            closeModal();
          }}
        />
      ),
    });
  };

  const handleDelete = useCallback(async () => {
    try {
      const wordId = row.original.id;
      await axios.delete(`/words/${wordId}`);
      onDeleteSuccess(wordId);
    } catch (error) {
      console.error('Error deleting word:', error);
    } finally {
      setIsPopoverOpen(false);
    }
  }, [onDeleteSuccess, row.original.id]);

  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()}>
        <IoIosMore />
      </button>
      {isPopoverOpen && (
        <FloatingFocusManager context={context || {}} modal={false}>
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
