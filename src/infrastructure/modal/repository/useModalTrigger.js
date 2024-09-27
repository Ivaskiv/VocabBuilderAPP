import { useMemo } from 'react';
import useModalContext from './useModalContext';
import { useMergeRefs } from '@floating-ui/react';

export default function useModalTrigger({ ref: outerRef }) {
  const {
    refs: { setReference },
    getReferenceProps,
  } = useModalContext();
  const ref = useMergeRefs([setReference, outerRef]);
  return useMemo(
    () => ({
      ref,
      getReferenceProps,
    }),
    [getReferenceProps, ref]
  );
};
