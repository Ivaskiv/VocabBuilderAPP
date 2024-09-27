// ModalTrigger.jsx
import { forwardRef } from 'react';
import useModalTrigger from '../../repository/useModalTrigger.js';
import classNames from 'classnames';
import style from './index.module.scss';

export default forwardRef(function ModalTrigger({ children, className, ...rest }, outerRef) {
  const { getReferenceProps, ref } = useModalTrigger({ ref: outerRef });
  return (
    <button
      {...getReferenceProps({
        ref,
        className: classNames(style.btn, className),
        type: 'button',
        ...rest,
      })}
    >
      {children}
    </button>
  );
});
