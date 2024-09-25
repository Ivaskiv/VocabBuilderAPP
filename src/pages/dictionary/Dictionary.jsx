import styles from './styles.module.css';
import Dashboard from '../../features/dashboard/components/dashboard/Dashboard';
import WordsTable from '../../features/tables/WordsTable/WordsTable';

const Dictionary = () => {
  return (
    <div className={styles.dictionary_page}>
      <Dashboard />
      <div>
        <WordsTable />
      </div>

      {/* <WordsPagination /> */}
    </div>
  );
};
export default Dictionary;
