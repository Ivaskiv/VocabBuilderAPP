import * as React from 'react';

export const PopoverContext = React.createContext(null);

export const usePopoverContext = () => {
  const context = React.useContext(context);

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};
