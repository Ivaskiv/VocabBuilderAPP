import EditWordForm from '../../forms/wordForm/EditWordForm';
import ModalProvider, { useModal } from '../ModalProvider';

export default function EditWordModal({ initialValues, onSuccess }) {
  const [isOpen, closeModal] = useModal();

  return (
    isOpen && (
      <ModalProvider
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
      </ModalProvider>
    )
  );
}
