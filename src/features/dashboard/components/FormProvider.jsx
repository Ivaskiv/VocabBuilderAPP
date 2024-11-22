// FormProvider.jsx

import { createContext } from 'react';
import { addWordSchema, wordFormSchema } from '../../../infrastructure/utils/validationSchemas';
import { useForm } from 'react-hook-form';

export const FormContext = createContext();

const FormProvider = ({ children, initialValues = null }) => {
  const formSchema = addWordSchema || wordFormSchema;
  const defaultValues = initialValues || {
    en: '',
    ua: '',
    category: '',
    verbType: '',
  };

  const form = useForm({
    schema: formSchema,
    defaultValues,
  });

  // const submitForm = async (values, isEditMode = false) => {
  //   try {
  //     if (isEditMode) {
  //       await editWord(values);
  //       console.log('Word edited:', values);
  //     } else {
  //       await addWord(values);
  //       console.log('Word added:', values);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  return (
    <FormContext.Provider value={{ form, formSchema, defaultValues }}>
      {children}
    </FormContext.Provider>
  );
};
export default FormProvider;
