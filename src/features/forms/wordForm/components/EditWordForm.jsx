import { editWord } from '../../../../infrastructure/utils/data';
import { wordFormSchema } from '../../../../infrastructure/utils/validationSchemas';
import FormProvider from './FormProvider';
import WordForm from '../tanstack/WordForm';

const EditWordForm = ({ initialValues, onClose, onSubmit }) => {
  const handleSubmit = async data => {
    try {
      editWord(data);
      if (onSubmit) {
        onSubmit(data);
      }
      onClose();
    } catch (error) {
      console.error('Error editing word:', error);
    }
  };

  return (
    <FormProvider initialValues={initialValues} schema={wordFormSchema}>
      <WordForm onSubmit={handleSubmit} onClose={onClose} isEditMode={true} />
    </FormProvider>
  );
};

export default EditWordForm;
