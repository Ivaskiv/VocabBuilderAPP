import styles from '../assets/styles/dictionary.module.css';
import WordsTable from '../components/tables/WordsTable/WordsTable';

const Recommend = () => {
  return (
    <div className={styles.recommend_page}>
      <h1>Recommend</h1>
      <WordsTable />
    </div>
  );
};
export default Recommend;
