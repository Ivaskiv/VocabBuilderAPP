import { createContext, useContext } from 'react';

const PopoverContext = createContext(null);

export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }
  return context;
};

export const PopoverProvider = PopoverContext.Provider;
