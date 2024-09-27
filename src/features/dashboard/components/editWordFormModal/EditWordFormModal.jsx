import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { memo } from 'react';
import { useModal } from '../../../../infrastructure/modal/repository/useModal';

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

export const Form = memo(function Form() {
  const { register, handleSubmit, setOpen } = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });
  // Write here creation logic;
  const onSubmit = data => console.log(data);
  const handleAdd = () => {
    //
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('ua')} placeholder="ua word" />
      <input {...register('en')} placeholder="en word" />
      <div className={styles.footer_btn}>
        <button type="button" onClick={handleAdd}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
});

export default function EditWordFormModal() {
  const { getFloatingProps } = useModal();

  return (
    <div
      className={styles.modal}
      {...getFloatingProps({
        role: 'dialog',
      })}
    >
      <div className={styles.modalContent}>
        <Form />
      </div>
    </div>
  );
}
