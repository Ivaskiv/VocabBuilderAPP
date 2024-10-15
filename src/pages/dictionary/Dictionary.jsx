import WordsTable from '../../features/tables/WordsTable';
import styles from './index.module.scss';
import { Dashboard } from '../../features/dashboard/components/dashboard';
import { WordProvider } from '../../features/dashboard/WordContext';

export default function Dictionary() {
  return (
    <div className={styles.dictionary_page}>
      <WordProvider>
        <Dashboard />
        <WordsTable />
      </WordProvider>

      {/* <WordsPagination /> */}
    </div>
  );
}
