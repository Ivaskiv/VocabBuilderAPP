import { createContext } from 'react';
import useModal from '../repository/useModal';

export const ModalContext = createContext();

export default function ModalProvider({ children, initialOpen = false, open, onOpenChange }) {
  const context = useModal({ initialOpen, open, onOpenChange });

  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
}
