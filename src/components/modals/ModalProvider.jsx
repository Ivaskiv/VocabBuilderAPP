// ModalProvider.jsx
import { createContext, useState, useContext } from 'react';
import ModalOverlay from './ModalOverlay';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = modalContent => {
    setModal(modalContent);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && <ModalOverlay onClose={closeModal}>{modal}</ModalOverlay>}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
