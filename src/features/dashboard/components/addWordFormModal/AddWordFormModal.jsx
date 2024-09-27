import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { memo, useState } from 'react';
import { useModal } from '../../../../infrastructure/modal/repository/useModal';
import FormProvider from '../FormProvider';
import CategoriesSelector from '../../../category/components/categorySelector/CategoriesSelector';

const defaultValues = {
  word: '',
  translation: '',
  category: '',
  verbType: '',
};

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
  category: Joi.string().required().messages({
    'any.required': 'Please select a category',
  }),
  verbType: Joi.string().valid('Regular', 'Irregular').optional(),
});

export const Form = memo(function Form({ categories, onAddWord, onClose }) {
  const methods = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });

  // Write here creation logic;

  const onSubmit = data => {
    console.log(data);
    onAddWord(data);
    onClose();
    // handleAdd(data);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CategoriesSelector categories={categories} />

        <input {...methods.register('ua')} placeholder="Ukrainian word" />
        <input {...methods.register('en')} placeholder="English word" />

        <div className={styles.footer_btn}>
          <button type="submit">Add</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
});

export default function AddWordFormModal({ categories }) {
  const { labelId, descriptionId, getFloatingProps, setOpen } = useModal();
  const localLabelId = 'add-word-label';
  const localDescriptionId = 'add-word-description';

  const [words, setWords] = useState([]);
  const handleAddWord = newWord => {
    setWords(prevWords => [...prevWords, newWord]);
    console.log('Words:', words);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className={styles.modal}
      {...getFloatingProps({
        role: 'dialog',
        'aria-labelledby': labelId,
        'aria-describedby': descriptionId,
      })}
    >
      <h2 id={localLabelId}>Add word</h2>
      <p id={localDescriptionId}>
        Adding a new word to the dict1ionary is an important step in enriching the language base and
        expanding the vocabulary.
      </p>
      <div className={styles.modalContent}>
        <Form categories={categories} onAddWord={handleAddWord} onClose={handleClose} />
      </div>
    </div>
  );
}
