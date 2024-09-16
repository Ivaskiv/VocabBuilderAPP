import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import styles from './styles.module.css';
import { addWordSchema, wordFormSchema } from '../../../infrastructure/utils/validationSchemas';
import useFormContext from './useFormContext';
import CategoriesPopup from './CategoriesPopup';
import WerbTypeSwitch from '../../dashboard/WerbTypeSwitch';
import { fetchCategories } from '../../../infrastructure/utils/data';

const WordForm = ({ onSubmit, onClose, isEditMode = false }) => {
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const categoryButtonRef = useRef(null);

  const { initialValues, submitForm, formSchema } = useFormContext();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    enabled: isCategoryPopupOpen,
  });

  const schema = isEditMode ? formSchema || wordFormSchema : addWordSchema;

  const form = useForm({
    defaultValues: initialValues || {
      en: '',
      ua: '',
      category: '',
      verbType: '',
    },
    validate: schema.validate,
    mode: 'onChange',
  });

  const { formState, handleSubmit, register, setError } = form;
  const { values, errors } = formState;

  const handleFormSubmit = async event => {
    event.preventDefault();
    const validationErrors = schema.validate(values, {
      abortEarly: false,
    }).error;
    if (validationErrors) {
      validationErrors.details.forEach(detail => {
        setError(detail.path[0], { type: 'manual', message: detail.message });
      });
      return;
    }
    try {
      await (submitForm ? submitForm(values) : onSubmit(values));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = category => {
    setError('category', { type: 'manual', message: '' });
    form.setValue('category', category);
    setIsCategoryPopupOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.word_form}>
      <div>
        <label htmlFor="en">English</label>
        <input id="en" {...register('en')} />
        {errors.en && <p>{errors.en.message}</p>}
      </div>

      <div>
        <label htmlFor="ua">Ukrainian</label>
        <input id="ua" {...register('ua')} />
        {errors.ua && <p>{errors.ua.message}</p>}
      </div>

      {!isEditMode && (
        <div>
          <label htmlFor="category"></label>
          <button
            type="button"
            onClick={() => setIsCategoryPopupOpen(true)}
            className={styles.category_button}
            ref={categoryButtonRef}
          >
            {values.category || 'Select category'}
          </button>
          {errors.category && <p>{errors.category.message}</p>}

          <CategoriesPopup
            isOpen={isCategoryPopupOpen}
            onClose={() => setIsCategoryPopupOpen(false)}
            onSelectCategory={handleCategorySelect}
            anchorElement={categoryButtonRef.current}
            categories={categories}
            loading={isLoading}
            error={isError}
          />
        </div>
      )}

      {values.category === 'Verb' && !isEditMode && (
        <>
          <label>Verb</label>
          <WerbTypeSwitch
            selectedVerbType={values.verbType || ''}
            onChange={e => form.setValue('verbType', e.target.value)}
          />
          {errors.verbType && <p>{errors.verbType.message}</p>}
        </>
      )}
    </form>
  );
};

export default WordForm;
