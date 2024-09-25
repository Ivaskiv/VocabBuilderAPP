import classNames from 'classnames';
import ModalCloseBtn from '../ModalCloseBtn';
import style from './index.module.scss';
import { forwardRef } from 'react';
import { FloatingFocusManager, FloatingOverlay } from '@floating-ui/react';
import useModalContext from '../../repository/useModalContext';

export default forwardRef(function Modal({ title, content, className, ...rest }, ref) {
  const { open, context } = useModalContext();
  return open ? (
    <FloatingOverlay lockScroll>
      <FloatingFocusManager context={context}>
        <div ref={ref} className={classNames(style.body, className)} {...rest}>
          <div className={style.header}>
            {title}
            <ModalCloseBtn className={style.closeBtn} />
          </div>
          <div className={style.content}>{content}</div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
});
