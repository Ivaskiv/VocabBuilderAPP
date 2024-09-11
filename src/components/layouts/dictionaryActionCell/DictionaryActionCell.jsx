import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EditWordForm from '../../forms/wordForm/EditWordForm';
import axios from 'axios';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useFloating,
} from '@floating-ui/react';

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  // @floating-ui/react
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  });
  console.log('Floating context:', context);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleEdit = () => {
    setIsEditOpen(true);
    setIsOpen(false);
  };

  const handleDelete = useCallback(async () => {
    try {
      const wordId = row.original.id;
      await axios.delete(`/words/${wordId}`);
      onDeleteSuccess(wordId);
      setIsOpen(false);
    } catch (error) {
      console.error('Error deleting word: ', error);
    }
  }, [onDeleteSuccess, row.original.id]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        <IoIosMore />
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className={styles.dictionary_popover}
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby="menuId"
            {...getFloatingProps}
          >
            <div id="menuId">
              <button onClick={handleEdit}>
                <FiEdit2 />
                Edit
              </button>
              <button onClick={handleDelete}>
                <RiDeleteBin6Line />
                Delete
              </button>
            </div>
          </div>
        </FloatingFocusManager>
      )}
      {isEditOpen && <EditWordForm word={row.original} onClose={() => setIsEditOpen(false)} />}
    </>
  );
}
