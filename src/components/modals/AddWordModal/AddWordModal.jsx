import EditWordForm from '../../forms/wordForm/EditWordForm';
import DynamicFormModal from '../DynamicFormModal';

export default function AddWordModal({ isOpen, closeModal, onSuccess }) {
  return (
    <DynamicFormModal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Add word"
      subtitle="Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary."
      footer={
        <>
          <button type="submit" form="word-form">
            Add
          </button>
          <button type="button" onClick={() => onSuccess()}>
            Cancel
          </button>
        </>
      }
    >
      <EditWordForm initialValues={{}} mode="add" onSuccess={() => closeModal()} />
    </DynamicFormModal>
  );
}
