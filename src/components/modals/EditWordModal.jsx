import { useForm } from '@tanstack/react-form';
import axios from 'axios';
import { Modal } from '@mui/material';

const EditWordModal = ({ wordData, onClose }) => {
  const form = useForm({
    initialValues: {
      en: wordData.en || '',
      ua: wordData.ua || '',
      category: wordData.category || '',
      verbType: wordData.verbType || '',
    },
    validate: {
      en: value => !/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/.test(value) && 'Invalid English word',
      ua: value => !/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u.test(value) && 'Invalid Ukrainian word',
      category: value => !value && 'Category is required',
      verbType: (value, values) => values.category === 'Verb' && !value && 'Verb type is required',
    },
  });

  const onSubmit = async values => {
    try {
      await axios.put(`/words/${wordData.id}/update`, values);
      onClose();
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className="modal-content">
        <h2>Edit Word</h2>
        <form id="edit-word-form" onSubmit={form.handleSubmit(onSubmit)}>
          <label htmlFor="category">Select a category:</label>
          <select {...form.getFieldProps('category')}>
            <option value="" disabled>
              Select a category
            </option>
          </select>
          {form.errors.category && <span>{form.errors.category}</span>}

          {form.values.category === 'Verb' && (
            <>
              <label>
                <input type="radio" value="regular" {...form.getFieldProps('verbType')} /> Regular
              </label>
              <label>
                <input type="radio" value="irregular" {...form.getFieldProps('verbType')} />{' '}
                Irregular
              </label>
              {form.errors.verbType && <span>{form.errors.verbType}</span>}
            </>
          )}

          <input {...form.getFieldProps('en')} placeholder="English word" />
          {form.errors.en && <span>{form.errors.en}</span>}

          <input {...form.getFieldProps('ua')} placeholder="Ukrainian word" />
          {form.errors.ua && <span>{form.errors.ua}</span>}

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditWordModal;
