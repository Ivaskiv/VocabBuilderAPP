import EditWordForm from '../../forms/wordForm/EditWordForm';
import { useModal } from '../ModalProvider';

export default function EditWordModal() {
  const { closeModal } = useModal();

  return (
    <div
    // title=""
    // subtitle={`Editing word: ${word.en}`}
    // footer={
    //   <>
    //     <button type="submit" form="word-form">
    //       Save
    //     </button>
    //     <button type="button" onClick={closeModal}>
    //       Cancel
    //     </button>
    //   </>
    // }
    >
      <EditWordForm />
      <button onClick={closeModal}>Close</button>
    </div>
  );
}
