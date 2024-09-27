//Modal.jsx

import classNames from 'classnames';
import ModalCloseBtn from '../ModalCloseBtn';
import styles from './styles.module.css';
import { forwardRef } from 'react';
import { FloatingFocusManager, FloatingOverlay } from '@floating-ui/react';
import useModalContext from '../../repository/useModalContext';
import ModalLabel from '../ModalLabel';
import ModalDescription from '../ModalDescription';

export default forwardRef(function Modal({ title, description, content, className, ...rest }, ref) {
  const { context, isOpen, getFloatingProps, labelId, descriptionId } = useModalContext();
  return isOpen ? (
    <FloatingOverlay lockScroll>
      <FloatingFocusManager context={context}>
        <div
          {...getFloatingProps({
            ref,
            className: classNames(styles.body, className),
            'aria-labelledby': labelId,
            'aria-describedby': descriptionId,
            ...rest,
          })}
        >
          <div className={styles.header}>
            {typeof title === 'string' ? <ModalLabel>{title}</ModalLabel> : title}
            {typeof description === 'string' ? (
              <ModalDescription>{description}</ModalDescription>
            ) : (
              description
            )}
            <ModalCloseBtn className={styles.closeBtn} />
          </div>
          <div className={styles.content}>{content}</div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
});
