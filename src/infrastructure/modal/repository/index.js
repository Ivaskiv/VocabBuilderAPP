import { useCallback } from 'react';
import useModalContext from './useModalContext';

export function useModalClose() {
  const { setOpen } = useModalContext();
  return useCallback(() => setOpen(false), [setOpen]);
}
