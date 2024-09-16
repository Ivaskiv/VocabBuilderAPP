import { addWord } from '../../../infrastructure/utils/data';
import { addWordSchema } from '../../../infrastructure/utils/validationSchemas';
import FormProvider from './FormProvider';
import WordForm from './WordForm';

const AddWordForm = ({ onClose }) => {
  const handleSubmit = async data => {
    try {
      addWord(data);
    } catch (error) {
      console.error('Error adding word:', error);
    }
    onClose();
  };

  return (
    <FormProvider schema={addWordSchema}>
      <WordForm onSubmit={handleSubmit} onClose={onClose} />
    </FormProvider>
  );
};

export default AddWordForm;
