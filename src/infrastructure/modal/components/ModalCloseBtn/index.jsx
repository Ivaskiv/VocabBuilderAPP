import { forwardRef } from 'react';
import style from './index.module.scss';
import classNames from 'classnames';
import { useModalClose } from '../../repository';

export default forwardRef(function ModalCloseBtn({ className, ...rest }, ref) {
  const close = useModalClose();
  return (
    <button {...rest} ref={ref} onClick={close} className={classNames(style.btn, className)}>
      X
    </button>
  );
});
