// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategory, setKeyword } from './filtersSlice';
// import { fetchCategories } from './categoriesOperations';
const Filters = () => {
  return <h3>Filters</h3>;

  // const Filters = () => {
  //   const dispatch = useDispatch();
  //   const categories = useSelector(state => state.filters.categories);
  //   const selectedCategory = useSelector(state => state.filters.selectedCategory);
  //   const keyword = useSelector(state => state.filters.keyword);

  //   const [search, setSearch] = useState(keyword);

  //   useEffect(() => {
  //     dispatch(fetchCategories());
  //   }, [dispatch]);

  //   const handleSearchChange = e => {
  //     const value = e.target.value.trim();
  //     setSearch(value);
  //   };

  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       dispatch(setKeyword(search));
  //     }, 300);

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [search, dispatch]);

  //   return (
  //     <div>
  //       <div>
  //         <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." />
  //       </div>
  //       <div>
  //         <select
  //           value={selectedCategory}
  //           onChange={e => dispatch(setSelectedCategory(e.target.value))}
  //         >
  //           <option value="">All Categories</option>
  //           {categories.map(category => (
  //             <option key={category.id} value={category.name}>
  //               {category.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //       {selectedCategory === 'verb' && (
  //         <div>
  //           <label>
  //             <input type="radio" name="verbType" value="action" onChange={() => {}} />
  //             Action
  //           </label>
  //           <label>
  //             <input type="radio" name="verbType" value="state" onChange={() => {}} />
  //             State
  //           </label>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default Filters;
