import styles from './styles.module.css';
import Dashboard from '../../features/dashboard/components/dashboard/Dashboard';
import WordsTable from '../../features/tables/WordsTable/WordsTable';
import DialogProvider from '../../features/modals/components/DialogProvider';
// import Dialog from './Dialog.jsx';
// import DialogAll from './DialogAll.jsx';
// import WordsPagination from '../components/common/WordsPagination';

const Dictionary = () => {
  return (
    <div className={styles.dictionary_page}>
      <DialogProvider>
        <Dashboard />
      </DialogProvider>
      <div>
        <DialogProvider>
          <WordsTable />
        </DialogProvider>
      </div>

      {/* <WordsPagination /> */}
    </div>
  );
};
export default Dictionary;
