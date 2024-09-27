const WerbTypeSwitch = ({ selectedVerbType, onChange }) => {
  const RadioButton = ({ id, value, checked, onChange, label }) => (
    <div>
      <label htmlFor={id}>
        <input id={id} type="radio" value={value} checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );

  return (
    <div>
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

export default WerbTypeSwitch;
