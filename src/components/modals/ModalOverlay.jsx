import { FloatingOverlay, FloatingFocusManager } from '@floating-ui/react';
import styles from './styles.module.css';

const ModalOverlay = ({ children, onClose }) => {
  return (
    <FloatingOverlay
      className={styles.overlay}
      lockScroll
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <FloatingFocusManager modal={true}>
        <div
          className={styles.modalContainer}
          role="dialog"
          aria-modal="true"
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            position: 'relative',
          }}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  );
};

export default ModalOverlay;
