//useDialogContext.js
import { createContext, useContext } from 'react';

export const DialogContext = createContext();

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  // console.log('Dialog context:', context);

  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
