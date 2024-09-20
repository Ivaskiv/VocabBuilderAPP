//useDialogContext.js
import { useContext } from 'react';
import { DialogContext } from '../components/Dialog';

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }
  return context;
};
