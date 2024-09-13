// ModalProvider.jsx
import { createContext, useState } from 'react';
import Modal from '../modals/Modal.jsx';

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
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
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}
