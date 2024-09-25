import { useState, useRef, useEffect } from 'react';
import { fetchCategories } from '../../../../infrastructure/utils/data';
import { addWordSchema, wordFormSchema } from '../../../../infrastructure/utils/validationSchemas';
import CategoriesPopup from '../../../category/components/CategoriesPopup';
import WerbTypeSwitch from '../../../category/components/WerbTypeSwitch';
import useFormContext from '../useFormContext';

const WordForm = ({ onSubmit, onClose, isEditMode = false }) => {
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const categoryButtonRef = useRef(null);

  useEffect(() => {
    if (isCategoryPopupOpen) {
      const loadCategories = async () => {
        setIsLoading(true);
        try {
          const data = await fetchCategories();
          setCategories(data);
          setIsError(false);
        } catch (error) {
          console.error('Failed to fetch categories', error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      loadCategories();
    }
  }, [isCategoryPopupOpen]);

  const { form, formSchema } = useFormContext();
  const { formState, setError } = form;
  if (!formState) {
    console.error('formState is undefined');
    return null;
  }
  const { values, errors } = formState || {};
  const schema = isEditMode ? formSchema || wordFormSchema : addWordSchema;

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
      await onSubmit(values);
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
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="en">English</label>
        <input id="en" {...form.register('en')} />
        {errors.en && <p>{errors.en.message}</p>}
      </div>

      <div>
        <label htmlFor="ua">Ukrainian</label>
        <input id="ua" {...form.register('ua')} />
        {errors.ua && <p>{errors.ua.message}</p>}
      </div>

      {!isEditMode && (
        <div>
          <label htmlFor="category"></label>
          <button
            type="button"
            onClick={() => setIsCategoryPopupOpen(true)}
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
      <div>
        <button type="submit">{isEditMode ? 'Save' : 'Add'}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WordForm;
