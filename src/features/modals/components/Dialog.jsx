// Dialog.jsx
import { useContext } from 'react';
import DialogContext from './DialogContext';
import { useFloating, useClick, useInteractions } from '@floating-ui/react';

export const DialogContent = ({ children, onClose }) => {
  return (
    <div className="dialog-content">
      {children}
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default function Dialog() {
  const { openModal, closeModal } = useContext(DialogContext);

  const { context } = useFloating({
    open: false,
    onOpenChange: isOpen => {
      if (!isOpen) closeModal();
    },
  });

  const click = useClick(context);
  const { getReferenceProps } = useInteractions([click]);

  const handleOpen = content => {
    openModal(<DialogContent onClose={closeModal}>{content}</DialogContent>);
  };

  return { ...getReferenceProps({ onClick: () => handleOpen() }) };
}
