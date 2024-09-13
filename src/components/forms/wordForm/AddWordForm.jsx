// import styles from './styles.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WordForm from './WordForm';
import { addWordSchema } from '../../../infrastructure/utils/validationSchemas.js';
import { showNotification } from '../../../infrastructure/store/notificationSlice.js';
import { selectWordCategories } from '../../../features/dictionary/categories/categoriesSelectors.js';

const AddWordForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectWordCategories);
  const [values, setValues] = useState({ en: '', ua: '', category: '', verbType: '' });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };
  const validate = () => {
    const { error } = addWordSchema.validate(values, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.reduce((acc, detail) => {
        acc[detail.path[0]] = detail.message;
        return acc;
      }, {});
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post('/words', values);
      onClose();
      //+update table
    } catch (error) {
      dispatch(showNotification({ message: 'Failed to add word. Try again', type: 'error' }));
    }
  };
  return (
    <WordForm
      initialValues={values}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      categories={categories}
      onClose={onClose}
      mode="add"
    />
  );
};
export default AddWordForm;
