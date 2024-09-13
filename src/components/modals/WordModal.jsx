import AddWordForm from '../forms/wordForm/AddWordForm';
import EditWordForm from '../forms/wordForm/EditWordForm';
import DynamicFormModal from './DynamicFormModal';

export default function WordModal({ mode, word, closeModal }) {
  const isEditing = mode === 'edit';

  const modalTitle = isEditing ? '' : 'Add word';
  const modalSubtitle = isEditing
    ? ''
    : 'Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary.';

  return (
    <DynamicFormModal title={modalTitle} subtitle={modalSubtitle}>
      {isEditing ? <EditWordForm word={word} /> : <AddWordForm onClose={closeModal} />}
    </DynamicFormModal>
  );
}
