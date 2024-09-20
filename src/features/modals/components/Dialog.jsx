//Dialog.jsx
import { cloneElement, createContext, forwardRef, isValidElement } from 'react';
import { useDialog } from '../floatingUi/useDialog';
import { useDialogContext } from '../floatingUi/useDialogContext';
import { useMergeRefs } from '@floating-ui/react';

export const DialogContext = createContext(null);

export function Dialog({ children, ...optitons }) {
  const dialog = useDialog(optitons);
  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>;
}
export const DialogTrigger = forwardRef(function DialogTrigger(
  { children, asChild = false, ...props },
  propRef
) {
  const context = useDialogContext();
  const childrenRef = children.ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      })
    );
  }

  return (
    <button
      ref={ref}
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});
