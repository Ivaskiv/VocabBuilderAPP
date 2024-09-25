import { forwardRef } from 'react';
import style from './index.module.scss';
import classNames from 'classnames';
import useModalContext from '../../repository/useModalContext';

export default forwardRef(function ModalCloseBtn({ className, ...rest }, ref) {
  const { setOpen } = useModalContext();
  return (
    <button
      {...rest}
      ref={ref}
      onClick={() => {
        setOpen(false);
      }}
      className={classNames(style.btn, className)}
    >
      X
    </button>
  );
});
