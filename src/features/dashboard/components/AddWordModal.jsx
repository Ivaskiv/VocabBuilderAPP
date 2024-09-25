import { useForm } from 'react-hook-form';
import Modal from '../../../infrastructure/modal/components/Modal';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { memo } from 'react';

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
  const { register, handleSubmit } = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });
  // Write here creation logic;
  return (
    <form onSubmit={handleSubmit(data => {})}>
      <input type="text" placeholder="Word (English)" {...register('word')} />
      <input
        type="text"
        placeholder="Translation (Ukrainian)"
        value={translation}
        onChange={e => setTranslation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Progress"
        value={progress}
        onChange={e => setProgress(e.target.value)}
        required
      />
    </form>
  );
});

export default function AddWordFormModal() {
  return (
    <Modal
      title={<h3>Add Word</h3>}
      content={
        <>
          <p>
            Adding a new word to the dictionary is an important step in enriching the language base
            and expanding the vocabulary.
          </p>
          <Form onAddWord={onAddWord} />
        </>
      }
    ></Modal>
  );
}
