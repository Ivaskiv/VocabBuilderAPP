//write component that every second
//randomly change value and on click logs it's current value

import styles from './styles.module.css';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export const ValueDisplay = forwardRef(function ValueDisplay({ value, onClick }, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      logValue: () => {
        console.log(`${value}`);
      },
    }),
    [value]
  );
  return (
    <button ref={containerRef} className={styles.container} onClick={onClick}>
      {value}
    </button>
  );
});
