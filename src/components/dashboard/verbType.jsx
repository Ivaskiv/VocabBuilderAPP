const VerbType = ({ selectedVerbType, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="Regular"
          checked={selectedVerbType === 'Regular'}
          onChange={onChange}
        />
        Regular
      </label>
      <label>
        <input
          type="radio"
          value="Irregular"
          checked={selectedVerbType === 'Irregular'}
          onChange={onChange}
        />
        Irregular
      </label>
    </div>
  );
};

export default VerbType;
