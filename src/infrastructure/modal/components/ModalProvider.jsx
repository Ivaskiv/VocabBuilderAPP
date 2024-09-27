import { useState } from 'react';
import ModalContext from './Modal/ModalContext';
import styles from './styles.module.css';

export default function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);

  const openModal = content => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const value = {
    open: openModal,
    close: closeModal,
    modalContent,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalContent && (
        <div className={styles.modal_overlay}>
          {modalContent}
          <button onClick={closeModal}>x</button>
        </div>
      )}
    </ModalContext.Provider>
  );
}
