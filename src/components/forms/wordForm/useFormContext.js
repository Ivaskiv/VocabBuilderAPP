import { useContext } from 'react';
import { FormContext } from './FormProvider';

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a ModalProvider');
  }
  return context;
};
export default useFormContext;
