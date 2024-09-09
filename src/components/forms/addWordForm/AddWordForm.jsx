// import styles from './styles.module.css';
import { useForm } from '@tanstack/react-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addWord } from '../../../infrastructure/utils/data';

const AddWordForm = ({ onClose }) => {
  // const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  const form = useForm({
    initialValues: {
      category: '',
      verbType: '',
      en: '',
      ua: '',
    },
    validate: {
      category: value => !value && 'Category is required',
      en: value => !/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/.test(value) && 'Invalid English word',
      ua: value => !/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u.test(value) && 'Invalid Ukrainian word',
      verbType: (value, values) => values.category === 'Verb' && !value && 'Verb type is required',
    },
  });
  const onSubmit = async values => {
    try {
      const response = await axios.post('/words/create', values);
      if (response.status === 201) {
        addWord({
          en: values.en,
          ua: values.ua,
          category: values.category,
        });
      }

      onClose();
    } catch (error) {
      console.error('Error creating word:', error);
    }
  };
  return (
    <form id="add-word-form" onSubmit={form.handleSubmit(onSubmit)}>
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

      <button type="submit">Add Word</button>
    </form>
  );
};

export default AddWordForm;
