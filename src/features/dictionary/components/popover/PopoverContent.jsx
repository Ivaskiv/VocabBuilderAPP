//PopoverContent.jsx
import styles from './index.module.scss';
import { FloatingFocusManager } from '@floating-ui/react';
import { usePopoverContext } from './usePopoverContext';

export function PopoverContent({ children }) {
  const { refs, getFloatingProps, isPopoverOpen, floatingStyles, context } = usePopoverContext();

  if (!isPopoverOpen) return null;

  return (
    <FloatingFocusManager context={context} modal={false}>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className={styles.popover_content}
      >
        {children}
      </div>
    </FloatingFocusManager>
  );
}
