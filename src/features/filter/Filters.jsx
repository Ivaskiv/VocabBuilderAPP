import { useState } from 'react';
import styles from './styles.module.css';
import DebouncedInput from './DebouncedInput';
import CategoriesPopup from '../../../features/category/components/CategoriesPopup';
import { CiSearch } from 'react-icons/ci';

const Filters = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoriesPopupOpen, setCategoriesPopupOpen] = useState(false);

  const handleSearchChange = value => {
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, selectedCategory });
  };

  const handleSelectCategory = category => {
    setSelectedCategory(category);
    setCategoriesPopupOpen(false);
    onFilterChange({ searchTerm, selectedCategory: category });
  };

  return (
    <div className={styles.filters}>
      <DebouncedInput value={searchTerm} onChange={handleSearchChange} placeholder="Search..." />
      <CiSearch />

      <div className={styles.CategoriesSelector}>
        <button onClick={() => setCategoriesPopupOpen(!isCategoriesPopupOpen)}>
          {selectedCategory || 'Categories 123'}
        </button>
        {isCategoriesPopupOpen && (
          <CategoriesPopup
            isOpen={isCategoriesPopupOpen}
            onClose={() => setCategoriesPopupOpen(false)}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </div>
    </div>
  );
};

export default Filters;
