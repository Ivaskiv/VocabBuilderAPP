import styles from './styles.module.css';

export default function DynamicFormModal({ title, subtitle, children, footer }) {
  return (
    <div className={styles.modal_content}>
      <div className={styles.modal_header}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className={styles.modalBody}>{children}</div>
      {footer && <div className={styles.modal_footer}>{footer}</div>}
    </div>
  );
}
