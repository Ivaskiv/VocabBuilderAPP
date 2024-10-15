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
import EditWordFormModal from '../../../dashboard/components/editWordFormModal/EditWordFormModal';
import ModalProvider from '../../../../infrastructure/modal/components/ModalProvider';
import ModalTrigger from '../../../../infrastructure/modal/components/ModalTrigger';
import { useWords } from '../../../dashboard/WordContext';

export default function DictionaryActionCell({ row }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    middleware: [offset(4), flip(), shift()],
  });

  const { removeWord } = useWords();

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const handleDelete = useCallback(() => {
    try {
      const wordId = row.original.id;
      console.log(`Deleting word with ID: ${wordId}`);
      removeWord(wordId);
      setIsPopoverOpen(false);
    } catch (error) {
      console.error('Error deleting word:', error);
    } finally {
      setIsPopoverOpen(false);
    }
  }, [row.original.id, removeWord]);

  const handleEditClick = () => {
    setIsPopoverOpen(false);
    console.log('Selected word:', row.original);
    setCurrentWord(row.original);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentWord(null);
  };

  return (
    <ModalProvider>
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
              <ModalTrigger onClick={handleEditClick}>
                <div className={styles.editBtn}>
                  <FiEdit2 /> Edit
                </div>
              </ModalTrigger>
              <button onClick={handleDelete}>
                <RiDeleteBin6Line /> Delete
              </button>
            </div>
          </FloatingFocusManager>
        )}

        {isModalOpen && <EditWordFormModal currentWord={currentWord} onClose={handleCloseModal} />}
      </div>
    </ModalProvider>
  );
}
