import { useState, useCallback } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import axios from 'axios';
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
import useModalContext from '../../modals/useModalContext';
import { removeWord } from '../../../infrastructure/utils/data';
import ModalProvider from '../../modals/ModalProvider';
import WordModal from '../../modals/WordModal.jsx';

const defaultContext = {};

export default function DictionaryActionCell({ row, onDeleteSuccess }) {
  const { openModal } = useModalContext();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    refs,
    floatingStyles,
    context = defaultContext,
  } = useFloating({
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
    openModal(
      <ModalProvider>
        <WordModal mode="edit" word={row.original} closeModal={() => setIsPopoverOpen(false)} />
      </ModalProvider>
    );
  }, [openModal, row.original]);

  // const handleDelete = useCallback(async () => {
  //   try {
  //     const wordId = row.original.id;
  //     await axios.delete(`/words/${wordId}`);
  //     onDeleteSuccess(wordId);
  //   } catch (error) {
  //     console.error('Error deleting word:', error);
  //   } finally {
  //     setIsPopoverOpen(false);
  //   }
  // }, [row.original.id, onDeleteSuccess]);

  const handleDelete = wordId => {
    try {
      removeWord(wordId);
      onDeleteSuccess(wordId);
    } catch (error) {
      console.error('Error deleting word:', error);
    } finally {
      setIsPopoverOpen(false);
    }
  };

  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()}>
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
