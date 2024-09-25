// ModalTrigger.jsx
import { forwardRef } from 'react';
import useModalTrigger from '../repository/useModalTrigger';

export default forwardRef(function ModalTrigger({ children, ...props }, ref) {
  const { toggle } = useModalTrigger();
  return (
    <button
      ref={ref}
      {...props}
      type="button"
      onClick={toggle}
      data-state={open ? 'open' : 'closed'}
    >
      {children}
    </button>
  );
});
