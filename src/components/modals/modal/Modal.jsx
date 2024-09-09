import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

const Modal = ({ isOpen, onClose, title, subtitle, children, footer }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!onClose) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_backdrop}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <button className={styles.close_btn}>x</button>
        </div>
      </div>
      <div className={styles.modal_body}>{children}</div>
      {footer && <div className={styles.modal_footer}>{footer}</div>}
    </div>
  );
};
export default Modal;
