// import { useState } from 'react';

import { useEffect, useState } from 'react';

const generateNumber = () => {
  const randomValue = Math.floor(Math.random() * 11);
  return randomValue;
};

export default function Task2() {
  const [isValue, setIsValue] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = generateNumber();
      setIsValue(newValue);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsValue(isValue);
    console.log('randomValue=', isValue);
  };

  return (
    <>
      <h3>Test2</h3>
      <button onClick={handleClick}>{isValue}</button>
    </>
  );
}
