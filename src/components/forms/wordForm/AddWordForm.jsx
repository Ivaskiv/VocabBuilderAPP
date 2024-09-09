// import styles from './styles.module.css';
import WordForm from './WordForm';

const AddWordForm = ({ onClose }) => {
  const handleSubmitSuccess = () => {
    console.log('Word added successfully');
  };
  return (
    <WordForm
      initialValues={{ en: '', ua: '', category: '', verbType: '' }}
      handleSubmitSuccess={handleSubmitSuccess}
      onClose={onClose}
      mode="add"
    />
  );
};
export default AddWordForm;
