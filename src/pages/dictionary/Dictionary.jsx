import WordsTable from '../../features/tables/WordsTable/WordsTable';
import ModalProvider from '../../infrastructure/modal/components/ModalProvider';
import styles from './styles.module.css';
import Dashboard from '../../features/dashboard/components/dashboard/Dashboard';

export default function Dictionary() {
  return (
    <div className={styles.dictionary_page}>
      <Dashboard />
      <ModalProvider>
        <WordsTable />
      </ModalProvider>
      {/* <WordsPagination /> */}
    </div>
  );
}
