import ModalContext from '../repository/ModalContext';
import { useModal } from '../repository/useModal';

export default function ModalProvider({ children, initialOpen = false, open, onOpenChange }) {
  const context = useModal({ initialOpen, open, onOpenChange });
  return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
}
