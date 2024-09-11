import EditWordForm from '../../forms/wordForm/EditWordForm';
import DynamicFormModal from '../DynamicFormModal';
import { useModal } from '../ModalProvider';

export default function EditWordModal({ initialValues, onSuccess }) {
  const [isOpen, closeModal] = useModal();

  return (
    isOpen && (
      <DynamicFormModal
        footer={
          <>
            <button type="submit" form="word-form">
              Save
            </button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </>
        }
      >
        <EditWordForm
          initialValues={initialValues}
          mode="edit"
          onSubmitSuccess={onSuccess}
          onClose={closeModal}
        />
      </DynamicFormModal>
    )
  );
}
