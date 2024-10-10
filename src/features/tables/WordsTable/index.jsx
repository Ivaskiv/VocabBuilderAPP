//WordsTable.jsx
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './index.module.scss';
import ProgressBar from '../../../layouts/progressBar/ProgressBar';
// import DictionaryActionCell from '../../dictionary/components/DictionaryActionCell';
import { useWords } from '../../dashboard/WordContext';

const WordsTable = () => {
  const { words } = useWords();
  console.log('Words in table:', words);
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.display({
      id: 'number',
      header: () => '№',
      cell: ({ row }) => row.index + 1,
    }),

    columnHelper.accessor('en', {
      id: 'word',
      header: () => 'Word',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('ua', {
      id: 'translation',
      header: () => 'Translation',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => 'Category',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('progress', {
      id: 'progress',
      header: () => 'Progress',
      cell: info => (
        <div className={styles.progress_container}>
          {`${info.getValue()}%`}
          <ProgressBar progress={info.getValue()} />
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => '',
      cell: info => info.getValue(),
      // cell: ({ row }) => <DictionaryActionCell row={row} />,
    }),
  ];

  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
    </>
  );
};

export default WordsTable;
