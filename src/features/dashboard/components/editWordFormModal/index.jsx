import { useForm, FormProvider } from 'react-hook-form';
import styles from './index.module.scss';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useWords } from '../../WordContext';
import Modal from '../../../../infrastructure/modal/components/Modal';

const schema = Joi.object({
  en: Joi.string()
    .pattern(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid English word',
    }),
  ua: Joi.string()
    .pattern(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u)
    .required()
    .messages({
      'string.pattern.base': 'Invalid Ukrainian word',
    }),
});

function EditWordForm({ wordData, closeModal }) {
  const methods = useForm({
    defaultValues: wordData,
    resolver: joiResolver(schema),
  });

  const { errors } = methods.formState;
  const { updateWord, words } = useWords();

  const onSubmit = data => {
    const existingWord = words.find(word => word.id !== wordData.id && word.en === data.en);
    if (existingWord) {
      methods.setError('en', {
        type: 'manual',
        message: 'Word already exists',
      });
      return;
    }

    try {
      updateWord({
        ...wordData,
        ...data,
      });
      closeModal();
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.inputWord}>
          <input {...methods.register('ua')} placeholder="Ukrainian word" />
          {errors.ua && <p className={styles.error}>{errors.ua.message}</p>}
        </div>
        <div className={styles.inputWord}>
          <input {...methods.register('en')} placeholder="English word" />
          {errors.en && <p className={styles.error}>{errors.en.message}</p>}
        </div>
        <div className={styles.footerBtn}>
          <button type="submit">Save</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default function EditWordFormModal({ open, currentWord, closeEditModal }) {
  return open ? (
    <Modal
      title="Edit word"
      description="Edit the word details below."
      content={<EditWordForm wordData={currentWord} closeModal={closeEditModal} />}
      onClose={closeEditModal}
      isOpen={open}
    />
  ) : null;
}
