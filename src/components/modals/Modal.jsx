import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useInteractions,
  useFloating,
} from '@floating-ui/react';
import styles from './styles.module.css';
import useModalContext from './useModalContext';
import FooterModalButtons from './FooterModalButtons';

export default function Modal() {
  const { isOpen, closeModal, modalContent } = useModalContext();
  const { refs, context } = useFloating({ open: isOpen, onOpenChange: closeModal });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const { getFloatingProps } = useInteractions([dismiss]);

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className={styles.modal_overlay} lockScroll>
        <FloatingFocusManager context={context} className={styles.modal_content}>
          <div ref={refs.setFloating} {...getFloatingProps()} className={styles.modal_container}>
            <button className={styles.close_btn} onClick={closeModal}>
              x
            </button>
            {modalContent}
            <FooterModalButtons />
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
