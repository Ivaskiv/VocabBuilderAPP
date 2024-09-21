import { cloneElement, forwardRef, isValidElement } from 'react';
import { useDialog } from '../floatingUi/useDialog';
import { useMergeRefs } from '@floating-ui/react';
import { DialogContext, useDialogContext } from '../floatingUi/useDialogContext';

export function Dialog({ children, ...options }) {
  const dialog = useDialog(options);

  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>;
}

export const DialogTrigger = forwardRef(function DialogTrigger({ children, ...props }, propRef) {
  const context = useDialogContext();
  const ref = useMergeRefs([context.refs.setReference, propRef, children?.ref]);

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...context.getReferenceProps({
        ref,
        'data-state': context.open ? 'open' : 'closed',
        ...props,
        ...children.props,
      }),
    });
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
