import {
  useFloating,
  autoUpdate,
  offset,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import { useEffect } from 'react';
import ModalProvider, { useModal } from './ModalProvider';
import styles from './styles.module.css';

export default function DynamicFormModal({ title, subtitle, children, footer }) {
  const { isOpen, closeModal } = useModal();

  const { x, y, floating, strategy, update } = useFloating({
    middleware: [offset(0)],
    placement: 'center',
  });

  useEffect(() => {
    if (floating.current) {
      const cleanup = autoUpdate(null, floating.current, update);
      return () => cleanup();
    }
  }, [floating, update]);

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <ModalProvider>
      <FloatingPortal>
        <FloatingOverlay lockScroll className={styles.modal_overlay} onClick={closeModal}>
          <div
            className={styles.modal_content}
            ref={floating}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.modal_header}>
              <h3>{title}</h3>
              <p>{subtitle}</p>
              <button className={styles.close_btn} onClick={closeModal}>
                x
              </button>
            </div>
            <div className={styles.modal_body}>{children}</div>
            {footer && <div className={styles.modal_footer}>{footer}</div>}
          </div>
        </FloatingOverlay>
      </FloatingPortal>
    </ModalProvider>
  );
}
