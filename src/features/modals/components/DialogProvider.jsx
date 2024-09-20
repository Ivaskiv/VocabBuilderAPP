//DialogProvider.jsx
import { createContext, useState } from 'react';
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';

export const DialogContext = createContext();

export default function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = content => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <DialogContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
      {isOpen && (
        <Dialog>
          <DialogContent>
            {modalContent}
            <button onClick={closeModal}>Close</button>
          </DialogContent>
        </Dialog>
      )}
    </DialogContext.Provider>
  );
}
