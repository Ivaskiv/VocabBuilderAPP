import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import fetchCategories from '../../../features/dictionary/categories/categoriesOperations';

export default function Filters({ onFilterChange }) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handler = debounce(() => {
      onFilterChange({ searchTerm: searchTerm.trim() });
    }, 300);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchTerm, onFilterChange]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
