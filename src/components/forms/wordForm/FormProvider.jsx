import { createContext } from 'react';
import { addWordSchema, wordFormSchema } from '../../../infrastructure/utils/validationSchemas';
import { addWord, editWord } from '../../../infrastructure/utils/data';

export const FormContext = createContext();

const FormProvider = ({ children, initialValues = null }) => {
  const formSchema = addWordSchema || wordFormSchema;
  const defaultValues = initialValues || {
    en: '',
    ua: '',
    category: '',
    verbType: '',
  };

  const submitForm = async (values, isEditMode = false) => {
    try {
      if (isEditMode) {
        editWord(values);
        console.log('Word edited:', values);
      } else {
        addWord(values);
        console.log('Word added:', values);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <FormContext.Provider value={{ formSchema, defaultValues, submitForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
