import WordsTable from '../components/tables/WordsTable/WordsTable';
import styles from '../assets/styles/dictionary.module.css';
// import Dashboard from '../components/dashboard/Dashboard';
// import WordsPagination from '../components/common/WordsPagination';

const Dictionary = () => {
  return (
    <div className={styles.dictionary_page}>
      <h1>Dictionary</h1>
      {/* <Dashboard /> */}
      <WordsTable />
      {/* <WordsPagination /> */}
    </div>
  );
};
export default Dictionary;
