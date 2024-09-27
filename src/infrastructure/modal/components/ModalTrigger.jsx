// ModalTrigger.jsx
import { forwardRef } from 'react';
import useModalTrigger from '../repository/useModalTrigger.js';

const ModalTrigger = forwardRef(function ModalTrigger({ children, ...props }, ref) {
  const modalTrigger = useModalTrigger();
  const toggle = modalTrigger ? modalTrigger.toggle : () => {};
  return (
    <div ref={ref} {...props} type="button" onClick={toggle}>
      {children}
    </div>
  );
});
export default ModalTrigger;
