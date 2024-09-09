import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesStatus,
} from '../../../features/dictionary/categories/categoriesSelectors';
import { useEffect } from 'react';
import { fetchCategories } from '../../../features/dictionary/categories/categoriesOperations';
import Modal from '../modal/Modal';
import AddWordForm from '../../forms/wordForm/AddWordForm';
const EditWordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch(); //для оновлення стану Redux

  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    if (isOpen && status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [isOpen, status, dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add word"
      subtitle="Adding a new word to the dictionary is an important step in enriching the language base and expanding the vocabulary."
      footer={
        <>
          <button type="button" form="add-word-form">
            Add
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </>
      }
    >
      {status === 'loading' && <p>Loading categories...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <AddWordForm categories={categories} onClose={onClose} />}
    </Modal>
  );
};
export default EditWordModal;
