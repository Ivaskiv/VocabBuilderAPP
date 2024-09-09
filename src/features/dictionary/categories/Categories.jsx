import { getCategories } from '../../../infrastructure/utils/data';

const Categories = () => {
  const categories = getCategories();

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
// import { useSelector } from 'react-redux';
// import {
//   selectCategories,
//   selectCategoriesError,
//   selectCategoriesStatus,
// } from './categoriesSelectors';

// const Categories = () => {
//   const categories = useSelector(selectCategories);
//   const status = useSelector(selectCategoriesStatus);
//   const error = useSelector(selectCategoriesError);

//   return (
//     <div>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'failed' && <p>Error: {error}</p>}
//       {status === 'succeeded' && (
//         <ul>
//           {categories.map(category => (
//             <li key={category.id}>{category.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Categories;
