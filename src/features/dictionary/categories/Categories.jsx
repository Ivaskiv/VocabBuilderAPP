import { useMemo } from 'react';
import { getCategories } from '../../../infrastructure/utils/data';

const Categories = () => {
  const categories = useMemo(() => getCategories(), []);

  return (
    <div>
      <select>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Categories;
