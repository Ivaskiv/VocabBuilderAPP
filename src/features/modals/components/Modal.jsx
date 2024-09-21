// Modal.js
import { useDialogContext } from '../floatingUi/useDialogContext';
import { Dialog } from './Dialog';
import { DialogClose, DialogContent } from './DialogContent';

const Modal = () => {
  const { isOpen, closeModal, modalContent } = useDialogContext();

  return (
    isOpen && (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent>
          {modalContent}
          <DialogClose onClick={closeModal}>Close</DialogClose>
        </DialogContent>
      </Dialog>
    )
  );
};
export default Modal;
