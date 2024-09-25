import AddWordForm from '../../forms/wordForm/components/AddWordForm';
import { DialogContent } from '../components/Dialog';

const AddWordModal = ({ onAddWord }) => {
  return (
    <DialogContent>
      <h3>Add Word</h3>
      <p>
        Adding a new word to the dictionary is an important step in enriching the language base and
        expanding the vocabulary.
      </p>

      <AddWordForm onAddWord={onAddWord} />
    </DialogContent>
  );
};

export default AddWordModal;
