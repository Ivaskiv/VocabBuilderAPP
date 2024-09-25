import { useContext } from 'react';
import DialogContext from '../components/DialogContext';

export default function useDialogContext() {
  const context = useContext(DialogContext);
  console.log('3333 Context:', context);

  if (!context) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }
}
