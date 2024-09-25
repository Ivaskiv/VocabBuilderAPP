// DialogTrigger.jsx
import { forwardRef, isValidElement, cloneElement, useContext } from 'react';
import DialogContext from './DialogContext';

export const DialogTrigger = forwardRef(function DialogTrigger(
  { children, asChild, ...props },
  ref
) {
  const { open, setOpen } = useContext(DialogContext);

  const handleClick = () => setOpen(!open);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref,
      onClick: handleClick,
      'data-state': open ? 'open' : 'closed',
      ...props,
    });
  }

  return (
    <button ref={ref} type="button" onClick={handleClick} data-state={open ? 'open' : 'closed'}>
      {children}
    </button>
  );
});
