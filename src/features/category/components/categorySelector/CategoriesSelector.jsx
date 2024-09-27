import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { fetchCategories } from '../../../../infrastructure/utils/data';
import WerbTypeSwitch from './WerbTypeSwitch';

export default function CategoriesSelector({ register }) {
  const { setValue, watch } = useFormContext();

  const [categories, setCategories] = useState([]);
  const [selectedVerbType, setSelectedVerbType] = useState('Regular');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    loadCategories();
  }, []);

  const selectedCategory = watch('category');

  const handleVerbTypeChange = e => {
    setSelectedVerbType(e.target.value);
    setValue('verbType', e.target.value);
  };

  return (
    <>
      <select {...register('category')}>
        {categories.map(category => (
          <option key={category.id} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {selectedCategory === 'Verb' && (
        <WerbTypeSwitch selectedVerbType={selectedVerbType} onChange={handleVerbTypeChange} />
      )}
    </>
  );
}
