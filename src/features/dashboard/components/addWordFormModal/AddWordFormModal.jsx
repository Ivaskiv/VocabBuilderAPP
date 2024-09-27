import { FormProvider, useForm } from 'react-hook-form';
import styles from './styles.module.css';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { memo } from 'react';
import CategoriesSelector from '../../../category/components/categorySelector/CategoriesSelector';
import Modal from '../../../../infrastructure/modal/components/Modal';
import { useSelector } from 'react-redux';
import { useModalClose } from '../../../../infrastructure/modal/repository';
import axios from 'axios';

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

const Form = memo(function Form() {
  const categories = useSelector();
  const methods = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });
  const close = useModalClose();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => {
          console.log(data);
          axios.post('some-fancy-url', data);
          close();
        })}
      >
        <CategoriesSelector categories={categories} />
        <input {...methods.register('ua')} placeholder="Ukrainian word" />
        <input {...methods.register('en')} placeholder="English word" />
        <div className={styles.footer_btn}>
          <button type="submit">Add</button>
          <button type="button" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
});

export default function AddWordFormModal() {
  return (
    <Modal
      label="Add word"
      description="Adding a new word to the dict1ionary is an important step in enriching the language base and
        expanding the vocabulary."
      content={<Form />}
    />
  );
}
