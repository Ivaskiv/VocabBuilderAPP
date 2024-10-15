// AddWordForm.jsx
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories as loadCategories } from '../../../category/redux/categoriesSlice';
import CategoriesSelector from '../../../category/components/categoriesSelector';
import VerbTypeSwitch from '../../../category/components/categoriesSelector/VerbTypeSwitch';
import styles from './index.module.scss';
import { useWords } from '../../WordContext';

export default function AddWordForm({ onClose }) {
  const defaultValues = {
    en: '',
    ua: '',
    category: '',
    verbType: 'Regular',
  };

  const schema = Joi.object({
    en: Joi.string()
      .pattern(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid English word',
      }),
    ua: Joi.string()
      .pattern(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u)
      .required()
      .messages({
        'string.pattern.base': 'Invalid Ukrainian word',
      }),
    category: Joi.string().required().messages({
      'any.required': 'Please select a category',
    }),
    verbType: Joi.string().valid('Regular', 'Irregular').optional(),
  });

  const methods = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });

  const { addWord, words } = useWords();
  const { errors } = methods.formState;
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(state => state.categories);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVerbType, setSelectedVerbType] = useState('Regular');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadCategories());
    }
  }, [status, dispatch]);

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
    methods.setValue('category', e.target.value);
  };

  const handleVerbTypeChange = e => {
    setSelectedVerbType(e.target.value);
  };

  const onSubmit = data => {
    const existingWord = words.find(word => word.en === data.en);
    if (existingWord) {
      methods.setError('en', {
        type: 'manual',
        message: 'Word already exists',
      });
      return;
    }

    try {
      addWord({
        ...data,
        id: uuidv4(),
        progress: 0,
        verbType: selectedCategory === 'Verb' ? selectedVerbType : undefined,
      });
      methods.reset();
      onClose();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        {status === 'loading' ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading categories: {error}</p>
        ) : (
          <CategoriesSelector
            name="category"
            categories={categories}
            onChange={handleCategoryChange}
            error={errors.category}
          />
        )}

        {selectedCategory === 'Verb' && (
          <VerbTypeSwitch
            selectedVerbType={selectedVerbType}
            onChange={handleVerbTypeChange}
            isVisible={selectedCategory === 'Verb'}
          />
        )}

        <input
          type="text"
          {...methods.register('en')}
          placeholder="English word"
          className={`${styles.input} ${errors.en ? styles.error : ''}`}
        />
        {errors.en && <span className={styles.errorMessage}>{errors.en.message}</span>}

        <input
          type="text"
          {...methods.register('ua')}
          placeholder="Ukrainian word"
          className={`${styles.input} ${errors.ua ? styles.error : ''}`}
        />
        {errors.ua && <span className={styles.errorMessage}>{errors.ua.message}</span>}

        <div className={styles.formBtn}>
          <button type="submit" className={styles.submitBtn}>
            Add
          </button>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={() => {
              methods.reset();
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
