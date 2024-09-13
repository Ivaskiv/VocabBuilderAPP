import styles from './styles.module.css';
import Dashboard from '../../components/dashboard/Dashboard.jsx';
import WordsTable from '../../components/tables/WordsTable/WordsTable.jsx';
import ModalProvider from '../../components/modals/ModalProvider.jsx';
// import Dialog from './Dialog.jsx';
// import DialogAll from './DialogAll.jsx';
// import WordsPagination from '../components/common/WordsPagination';

const Dictionary = () => {
  return (
    <div className={styles.dictionary_page}>
      <Dashboard />
      <div>
        <ModalProvider>
          <WordsTable />
        </ModalProvider>
      </div>
      {/* <div>
        <h1>Floating UI — Dialog</h1>
        <ModalProvider>
          <Dialog />
          <DialogAll />
        </ModalProvider>
      </div> */}

      {/* <WordsPagination /> */}
    </div>
  );
};
export default Dictionary;
