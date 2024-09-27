import { forwardRef, useEffect, useId } from 'react';
import useModalContext from '../../repository/useModalContext';
import style from './index.module.scss';
import classNames from 'classnames';

export default forwardRef(function ModalDescription({ As = 'p', className, ...rest }, ref) {
  const { setDescriptionId } = useModalContext();
  const id = useId();
  useEffect(() => {
    setDescriptionId(id);
    return () => {
      setDescriptionId(null);
    };
  }, [id, setDescriptionId]);
  return <As ref={ref} id={id} {...rest} className={classNames(style.label, className)}></As>;
});
