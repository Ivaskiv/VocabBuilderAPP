import styles from './styles.module.css';
import Dashboard from '../../components/dashboard/Dashboard';
import WordsTable from '../../components/tables/WordsTable/WordsTable.jsx';
// import WordsPagination from '../components/common/WordsPagination';

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
