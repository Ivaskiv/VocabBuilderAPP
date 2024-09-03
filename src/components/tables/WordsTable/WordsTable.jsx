// import { CiSearch } from 'react-icons/ci';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchWords } from '../../../features/words/wordsOperations';
import styles from '../../../assets/styles/dictionary.module.css';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const apiUrl = 'https://vocab-builder-backend.p.goit.global/api';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('en', {
    header: () => 'Word',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('ua', {
    header: () => 'Translation',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: () => 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('progress', {
    header: () => 'Progress',
    cell: info => `${info.getValue()}%`,
  }),
  columnHelper.accessor('editDelete', {
    header: () => '',
    cell: info => info.getValue(),
  }),
];

function WordsTable() {
  // const dispatch = useDispatch();
  // const data = useSelector(selectWords);
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [search, setSearch] = useState('');

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch('/words/categories');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const categoriesData = await response.json();
  //       setCategories(categoriesData);
  //     } catch (err) {
  //       console.error('Failed to fetch categories:', err);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchWords({ category: selectedCategory, keyword: search }));
  // }, [dispatch, selectedCategory, search]);

  // отримання даних з бекенду
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`${apiUrl}/words/own`);
        setWords(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWords();
  }, []);
  //щоб зайвий раз не переобчислювати, переобчислиться лише тоді коли зміниться масив
  const data = useMemo(() => words, [words]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* <div className={styles.filters}>
        <input
          className={styles.search}
          type="text"
          placeholder="Find the word"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <CiSearch className={styles.icon_search} />
        <label htmlFor="category-select">Categories</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div> */}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default WordsTable;
