import axios from 'axios';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  category: Joi.string().required().label('Category'),
  en: Joi.string()
    .regex(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/)
    .required()
    .label('English word')
    .messages({
      'string.pattern.base': 'Invalid English word',
    }),
  ua: Joi.string()
    .regex(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u)
    .required()
    .label('Ukrainian word')
    .messages({
      'string.pattern.base': 'Invalid Ukrainian word',
    }),
  verbType: Joi.when('category', {
    is: 'Verb',
    then: Joi.string().valid('regular', 'irregular').required().label('Verb Type'),
    otherwise: Joi.optional(),
  }),
});

export default function WordForm({ initialValues, onSubmitSuccess, onClose, mode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: joiResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async values => {
    try {
      if (mode === 'add') {
        await axios.post('/words/add', values);
      } else {
        await axios.post(`/words/${values.id}/edit`, values);
      }
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="word-form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('en')} placeholder="English word" />
      {errors.en && <span>{errors.en.message}</span>}
      <input {...register('ua')} placeholder="Ukrainian word" />
      {errors.ua && <span>{errors.ua.message}</span>}
      <button type="submit">{mode === 'add' ? 'Add' : 'Save'}</button>
    </form>
  );
}
