import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../features/dictionary/categories/categoriesSelectors';
import { addWord } from '../../../infrastructure/utils/data';
import { useForm } from 'react-hook-form';

const WordForm = ({ initialValues, onSubmitSuccess, onClose, mode }) => {
  const categories = useSelector(selectCategories);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues,
    validate: {
      category: value => !value && 'Category is required',
      en: value => !/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/.test(value) && 'Invalid English word',
      ua: value => !/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u.test(value) && 'Invalid Ukrainian word',
      verbType: (value, values) => values.category === 'Verb' && !value && 'Verb type is required',
    },
  });

  const handleSubmit = async values => {
    try {
      if (mode === 'add') {
        addWord(values);
        onSubmitSuccess();
        onClose();
      } else {
        const url = `/words/${values.id}/edit`;
        const response = await axios.post(url, values);
        if (response.status === 200 || response.status === 201) {
          onSubmitSuccess();
          onClose();
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <form id="word-form" onSubmit={form.handleSubmit(handleSubmit)}>
        <label htmlFor="category">Select a category:</label>
        <select {...form.getFieldProps('category')}>
          <option value="" disabled>
            Select a category
          </option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {form.errors.category && <span>{form.errors.category}</span>}

        {form.values.category === 'Verb' && (
          <>
            <label>
              <input type="radio" value="regular" {...form.getFieldProps('verbType')} /> Regular
            </label>
            <label>
              <input type="radio" value="irregular" {...form.getFieldProps('verbType')} /> Irregular
            </label>
          </>
        )}
        <input {...form.getFieldProps('en')} placeholder="English word" />
        {form.errors.en && <span>{form.errors.en}</span>}

        <input {...form.getFieldProps('ua')} placeholder="Ukrainian word" />
        {form.errors.ua && <span>{form.errors.ua}</span>}

        {error && <div className="error-message">{error}</div>}

        <button type="submit">{mode === 'add' ? 'Add' : 'Save'}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default WordForm;
