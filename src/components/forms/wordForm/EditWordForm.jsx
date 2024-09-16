import { editWord } from '../../../infrastructure/utils/data';
import { wordFormSchema } from '../../../infrastructure/utils/validationSchemas';
import FormProvider from './FormProvider';
import WordForm from './WordForm';

const EditWordForm = ({ initialValues, onClose }) => {
  const handleSubmit = async data => {
    try {
      editWord(data);
    } catch (error) {
      console.error('Error editing word:', error);
    }
    onClose();
  };

  return (
    <FormProvider initialValues={initialValues} schema={wordFormSchema}>
      <WordForm onSubmit={handleSubmit} onClose={onClose} isEditMode={true} />
    </FormProvider>
  );
};

export default EditWordForm;
