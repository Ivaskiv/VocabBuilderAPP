import { useState } from 'react';
import { DialogContext } from '../floatingUi/useDialogContext';

export function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = content => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}
    </DialogContext.Provider>
  );
}
