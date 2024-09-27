import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import WerbTypeSwitch from './WerbTypeSwitch';
const categories = [];

export default function CategoriesSelector({ name }) {
  const { setValue, watch, register } = useFormContext();
  const [selectedVerbType, setSelectedVerbType] = useState('Regular');
  const selectedCategory = watch(name);

  const handleVerbTypeChange = e => {
    setSelectedVerbType(e.target.value);
    setValue('verbType', e.target.value);
  };

  return (
    <>
      <select {...register(name)}>
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
