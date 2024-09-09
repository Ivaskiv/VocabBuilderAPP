import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './styles.module.css';
import ProgressBar from '../../layouts/progressBar/ProgressBar';
import ActionsBtn from '../../layouts/ActionsBtn';
import defaultData from '../../../infrastructure/utils/data';

//! columnHelper використовується для створення колонок таблиці, а
//! columnHelper.accessor дозволяє визначати, яке поле даних буде відображено в колонці, та забезпечує можливість кастомізації відображення даних

const WordsTable = ({ data = defaultData, onEdit, onDelete }) => {
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
      cell: info => (
        <div className={styles.progress_container}>
          {`${info.getValue()}%`}
          <ProgressBar progress={info.getValue()} />
        </div>
      ),
    }),
    columnHelper.display({
      header: () => '',
      cell: ({ row }) => <ActionsBtn row={row} onEdit={onEdit} onDelete={onDelete} />,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data || data.length === 0) {
    return <p>No data variables</p>;
  }
  // const handleEditWord = wordData => {
  // Логіка для відкриття модалки редагування
  // };

  // const handleDeleteWord = async wordId => {
  //   try {
  //     await deleteWord(wordId);
  //     updateTable();
  //   } catch (error) {
  //     console.error('Error deleting word:', error);
  //   }
  // };
  return (
    <table className={styles.table}>
      {/* thead */}
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={styles.tr}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className={styles.th}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* tbody */}
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={styles.td}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WordsTable;

{
  /* headerGroup().map(headerGroup => (...)): Проходить по кожній групі заголовків і створює рядок таблиці (<tr>) */
}

{
  /* headerGroup.headers.map(header => (...)): Для кожного заголовка в групі створює окрему клітинку (<th>) */
}

{
  /* flexRender: Використовується для рендерингу контенту заголовка або функції, щоб вивести заголовок колонки  */
}

{
  /* /* getCoreRowModel().rows.map(row => (...)): Проходить по кожному рядку таблиці і створює елемент <tr> для кожного рядка */
}

{
  /* row.getVisibleCells().map(cell => (...)): Проходить по видимих клітинках у кожному рядку і створює елемент <td> для кожної клітинки */
}

{
  /* flexRender: Використовується для рендерингу вмісту клітинки. Він обробляє значення, що передається у cell.column.columnDef.cell, яке може бути функцією або JSX, і правильно виводить його у клітинці */
}

// useCallback для збереження функцій,
//  а useMemo для збереження результатів обчислень чи об'єктів/масивів, щоб уникнути зайвих рендерів компонентів
