import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import fetchCategories from '../../../features/dictionary/categories/categoriesOperations';
import { createSelector } from 'reselect';

const selectFilters = state => state.filters || { categories: [] };
const selectCategories = createSelector([selectFilters], filters => filters.categories);

export default function Filters({ onFilterChange }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  //=============
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  //=============
  useEffect(() => {
    const handler = debounce(() => {
      const sanitizedValue = searchTerm.trim();
      setDebouncedSearchTerm(sanitizedValue);
      onFilterChange({ searchTerm: sanitizedValue, selectedCategory });
    }, 300);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchTerm, selectedCategory, onFilterChange]);
  //=============
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };
  //=============
  const handleCategoryChange = e => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange({ searchTerm: debouncedSearchTerm, selectedCategory: category });
  };

  const filteredCategories = useMemo(() => {
    return categories.map(category => (
      <option key={category.id} value={category.name} placeholder="Categories">
        {category.name}
      </option>
    ));
  }, [categories]);

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </div>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {filteredCategories}
        </select>
      </div>
      {selectedCategory === 'Verb' && (
        <div>
          <label>
            <input type="radio" name="verbType" value="action" onChange={() => {}} />
            Action
          </label>
          <label>
            <input type="radio" name="verbType" value="state" onChange={() => {}} />
            State
          </label>
        </div>
      )}
    </div>
  );
}
