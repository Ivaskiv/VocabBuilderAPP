import styles from './styles.module.css';
import { useState } from 'react';

export default function FooterModalButtons({ isEditing, onCancel }) {
  const [isActive, setIsActive] = useState(isEditing);

  return (
    <div className={styles.footer_btns}>
      <button
        type="submit"
        form="word-form"
        className={isActive ? 'active' : 'inactive'}
        onClick={() => setIsActive(true)}
      >
        {isEditing ? 'Save' : 'Add'}
      </button>
      <button
        type="button"
        className={isActive ? 'active' : 'inactive'}
        onClick={() => {
          setIsActive(false);
          onCancel();
        }}
      >
        Cancel
      </button>
    </div>
  );
}
