import styles from './index.module.scss';

const VerbTypeSwitch = ({ selectedVerbType, onChange }) => {
  const RadioButton = ({ id, value, checked, onChange, label }) => (
    <div className={styles.radioBtnContainer}>
      <input
        id={id}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioBtnInput}
      />
      <label htmlFor={id} className={styles.radioBtnLabel}>
        <span className={styles.radioBtnText}>{label}</span>
      </label>
    </div>
  );

  return (
    <div className={styles.radioBtnGroup}>
      <RadioButton
        id="regular"
        value="Regular"
        checked={selectedVerbType === 'Regular'}
        onChange={onChange}
        label="Regular"
      />
      <RadioButton
        id="irregular"
        value="Irregular"
        checked={selectedVerbType === 'Irregular'}
        onChange={onChange}
        label="Irregular"
      />
    </div>
  );
};

export default VerbTypeSwitch;
