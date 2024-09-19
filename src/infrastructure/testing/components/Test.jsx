import React from 'react';

export default function Test() {
  const ref = React.useRef(null);
  const ref2 = React.useRef(0);
  React.useEffect(() => {
    setTimeout(() => {
      // ref.current = div
      console.log(ref.current.getBoundaryClientRect()); //1.y=0
    }, 2000);
  }, []);
  React.useEffect(() => {
    let timeout;
    const fn = () => {
      timeout = setTimeout(() => {
        ref2.current += 1;
        fn();
      }, 2000);
      fn();
    };
    fn();
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div
      ref={ref}
      onClick={() => {
        console.log('heavy resource action', ref2.current);
      }}
    ></div>
  );
}
