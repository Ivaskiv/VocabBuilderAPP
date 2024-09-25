import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

const DebouncedInput = ({ value, onChange, delay = 300 }) => {
  const debouncedOnChange = useCallback(
    debounce(value => onChange(value.trim()), delay),
    [onChange, delay]
  );

  useEffect(() => {
    debouncedOnChange(value);
    return debouncedOnChange.cancel;
  }, [value, debouncedOnChange]);

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default DebouncedInput;
