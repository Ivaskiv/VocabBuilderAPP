import { forwardRef, useCallback, useMemo } from 'react';
import useModalContext from './useModalContext';

export default forwardRef(function useModalTrigger() {
  const { setOpen } = useModalContext();
  const toggle = useCallback(() => {
    setOpen(isOpened => !isOpened);
  }, [setOpen]);
  return useMemo(
    () => ({
      toggle,
    }),
    [toggle]
  );
});
