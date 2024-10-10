import Modal from '../../../../infrastructure/modal/components/Modal';
import AddWordForm from './AddWordForm';

export default function AddWordFormModal() {
  return (
    <Modal
      title="Add word"
      description="Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary."
      content={<AddWordForm />}
    ></Modal>
  );
}
