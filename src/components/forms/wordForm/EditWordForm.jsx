import Joi from 'joi';
import { useState } from 'react';
import WordForm from './WordForm';

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

export default function EditWordForm({ word = { en: '', ua: '' }, onSubmitSuccess, onCancel }) {
  const [values, setValues] = useState(word);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const { error } = schema.validate(values, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.reduce((acc, detail) => {
        acc[detail.path[0]] = detail.message;
        return acc;
      }, {});
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSubmitSuccess(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <WordForm values={values} errors={errors} handleChange={handleChange} onCancel={onCancel} />
      <button type="submit">Save</button>
    </form>
  );
}
