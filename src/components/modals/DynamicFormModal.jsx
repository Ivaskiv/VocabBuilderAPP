import { useModal } from './ModalProvider';
import styles from './styles.module.css';

export default function DynamicFormModal({ title, subtitle, children, footer }) {
  const { closeModal } = useModal();

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button className={styles.closeButton} onClick={handleClose}>
          x
        </button>
      </div>
      <div className={styles.modalBody}>{children}</div>
      {footer && <div className={styles.modalFooter}>{footer}</div>}
    </div>
  );
}
