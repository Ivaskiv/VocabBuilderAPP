// Modal.js
import { Dialog, DialogContent, DialogClose } from './DialogContent';
import { useDialogContext } from '../floatingUi/useDialogContext';

export const Modal = ({ title, children }) => {
  const { isOpen, closeModal } = useDialogContext();

  return (
    isOpen && (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent>
          <h2>{title}</h2>
          {children}
          <DialogClose onClick={closeModal}>Close</DialogClose>
        </DialogContent>
      </Dialog>
    )
  );
};
