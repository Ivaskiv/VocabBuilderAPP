// // import { CiSearch } from 'react-icons/ci';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchWords } from '../../../features/words/wordsOperations';
// import styles from './wordsTable.module.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useVueTable } from '@tanstack/vue-table';

// const data =
//   (() => [
//     {
//       col1: 'Row 1 Col 1',
//       col2: 'Row 1 Col 2',
//       col3: 'Row 1 Col 3',
//       col4: 'Row 1 Col 4',
//       col5: 'Row 1 Col 5',
//     },
//     {
//       col1: 'Row 2 Col 1',
//       col2: 'Row 2 Col 2',
//       col3: 'Row 2 Col 3',
//       col4: 'Row 2 Col 4',
//       col5: 'Row 2 Col 5',
//     },
//     {
//       col1: 'Row 3 Col 1',
//       col2: 'Row 3 Col 2',
//       col3: 'Row 3 Col 3',
//       col4: 'Row 3 Col 4',
//       col5: 'Row 3 Col 5',
//     },
//     {
//       col1: 'Row 4 Col 1',
//       col2: 'Row 4 Col 2',
//       col3: 'Row 4 Col 3',
//       col4: 'Row 4 Col 4',
//       col5: 'Row 4 Col 5',
//     },
//     {
//       col1: 'Row 5 Col 1',
//       col2: 'Row 5 Col 2',
//       col3: 'Row 5 Col 3',
//       col4: 'Row 5 Col 4',
//       col5: 'Row 5 Col 5',
//     },
//     {
//       col1: 'Row 6 Col 1',
//       col2: 'Row 6 Col 2',
//       col3: 'Row 6 Col 3',
//       col4: 'Row 6 Col 4',
//       col5: 'Row 6 Col 5',
//     },
//     {
//       col1: 'Row 7 Col 1',
//       col2: 'Row 7 Col 2',
//       col3: 'Row 7 Col 3',
//       col4: 'Row 7 Col 4',
//       col5: 'Row 7 Col 5',
//     },
//     {
//       col1: 'Row 8 Col 1',
//       col2: 'Row 8 Col 2',
//       col3: 'Row 8 Col 3',
//       col4: 'Row 8 Col 4',
//       col5: 'Row 8 Col 5',
//     },
//   ],
//   []);

// const columnHelper = createColumnHelper();

// const columns =
//   (() => [
//     columnHelper.accessor('en', {
//       header: () => 'Word',
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor('ua', {
//       header: () => 'Translation',
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor('category', {
//       header: () => 'Category',
//       cell: info => info.getValue(),
//     }),
//     columnHelper.accessor('progress', {
//       header: () => 'Progress',
//       cell: info => `${info.getValue()}%`,
//     }),
//     columnHelper.accessor('editDelete', {
//       header: () => '',
//       cell: info => info.getValue(),
//     }),
//   ],
//   []);

// const { getTableProps, getTableBodyProps, headerGroup, rows, prepareRow } = useReactTable({
//   columns,
//   data,
// });

// function WordsTable() {
//   // const [categories, setCategories] = useState([]);
//   // const [selectedCategory, setSelectedCategory] = useState('');
//   // const [search, setSearch] = useState('');

//   // useEffect(() => {
//   //   const fetchCategories = async () => {
//   //     try {
//   //       const response = await fetch('/words/categories');
//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok');
//   //       }
//   //       const categoriesData = await response.json();
//   //       setCategories(categoriesData);
//   //     } catch (err) {
//   //       console.error('Failed to fetch categories:', err);
//   //     }
//   //   };
//   //   fetchCategories();
//   // }, []);

//   // useEffect(() => {
//   //   dispatch(fetchWords({ category: selectedCategory, keyword: search }));
//   // }, [dispatch, selectedCategory, search]);

//   // отримання даних з бекенду
//   // useEffect(() => {
//   //   const fetchWords = async () => {
//   //     try {
//   //       const response = await axios.get(`/words/own`);
//   //       setWords(response.data);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError(err);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchWords();
//   // }, []);

//   return (
//     <>
//       {/* <div className={styles.filters}>
//         <input
//           className={styles.search}
//           type="text"
//           placeholder="Find the word"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <CiSearch className={styles.icon_search} />
//         <label htmlFor="category-select">Categories</label>
//         <select
//           id="category-select"
//           value={selectedCategory}
//           onChange={e => setSelectedCategory(e.target.value)}
//         >
//           <option value="">All</option>
//           {categories.map(category => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div> */}

//       <table className={styles.table}>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default WordsTable;
