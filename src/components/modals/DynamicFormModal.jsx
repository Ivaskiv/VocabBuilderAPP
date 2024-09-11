import { useFloating, autoUpdate, offset, FloatingPortal } from '@floating-ui/react';
import { useEffect } from 'react';
import { useModal } from './ModalProvider';
import styles from './styles.module.css';

export default function DynamicFormModal({ title, subtitle, children, footer }) {
  const { isOpen, closeModal } = useModal();
  const { x, y, reference, floating, strategy, update } = useFloating({
    middleware: [offset[4]],
  });
  useEffect(() => {
    const cleanup = autoUpdate(reference.current, floating.current, update);
    return () => cleanup();
  }, [reference, floating, update]);

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
    <FloatingPortal>
      <div className={styles.modal_backdrop}>
        <div
          className={styles.modal_content}
          ref={floating}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
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
      </div>
    </FloatingPortal>
  );
}
