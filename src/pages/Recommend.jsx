import WordsTable from '../components/tables/WordsTable/WordsTable';
import styles from '../assets/styles/dictionary.module.css';

const Recommend = () => {
  return (
    <div className={styles.recommend_page}>
      <h1>Recommend</h1>
      <WordsTable />
    </div>
  );
};
export default Recommend;
