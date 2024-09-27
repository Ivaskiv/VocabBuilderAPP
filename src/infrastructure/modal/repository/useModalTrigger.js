import { forwardRef, useCallback, useMemo } from 'react';
import useModalContext from './useModalContext';

const useModalTrigger = () => {
  forwardRef(function useModalTrigger() {
    const { open, setOpen } = useModalContext();
    const toggle = useCallback(() => {
      setOpen(prev => !prev);
    }, [setOpen]);
    return useMemo(
      () => ({
        toggle,
        open,
      }),
      [toggle, open]
    );
  });
};
export default useModalTrigger;

// const useModalTrigger = () => {
//   forwardRef(function useModalTrigger() {
//     const { setOpen } = useModalContext();
//     const toggle = useCallback(() => {
//       setOpen(isOpened => !isOpened);
//     }, [setOpen]);
//     return useMemo(
//       () => ({
//         toggle,
//       }),
//       [toggle]
//     );
//   });
// };
// export default useModalTrigger;
