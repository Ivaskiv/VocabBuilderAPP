import { useContext } from 'react';
import { ModalContext } from '.';

export default function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be wrapped in <ModalProvider />');
  }
}
