//write component that every second
//randomly change value and on click logs it's current value

import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';
import { ValueDisplay } from './ValueDisplay';

export default function DispalyRundomValue() {
  const [value, setValue] = useState(generateRundomValue());
  const displayRef = useRef(null);
  const intervalRef = useRef(null);
  function generateRundomValue() {
    return Math.floor(Math.random() * 100);
  }
  useEffect(() => {
    intervalRef.current = null;
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);
  function startInterval() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setValue(generateRundomValue());
      }, 1000);
    }
  }
  const handleClick = () => {
    if (displayRef.current) {
      displayRef.current.logValue();
    }
  };
  const handleClickStart = () => {
    startInterval();
  };
  const handleClickStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <>
      <p className={styles.title}>
        T2. Write component that every second randomly change value and on click logs it`s current
        value
      </p>
      <div className={styles.container}>
        <ValueDisplay ref={displayRef} value={value} onClick={handleClick} />
        <div className={styles.btns_container}>
          <button onClick={handleClickStart}>Start</button>
          <button onClick={handleClickStop}>Stop</button>
        </div>
      </div>
    </>
  );
}
