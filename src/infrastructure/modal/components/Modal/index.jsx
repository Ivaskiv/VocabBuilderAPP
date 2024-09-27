//Modal.jsx

import classNames from 'classnames';
import ModalCloseBtn from '../ModalCloseBtn';
import styles from './styles.module.css';
import { forwardRef } from 'react';
import { FloatingFocusManager, FloatingOverlay } from '@floating-ui/react';
import useModalContext from '../../repository/useModalContext';

export default forwardRef(function Modal({ title, content, className, ...rest }, ref) {
  const { context, isOpen } = useModalContext();
  return isOpen ? (
    <FloatingOverlay lockScroll>
      <FloatingFocusManager context={context}>
        <div ref={ref} className={classNames(styles.body, className)} {...rest}>
          <div className={styles.header}>
            {title}
            <ModalCloseBtn className={styles.closeBtn} />
          </div>
          <div className={styles.content}>{content}</div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
});
