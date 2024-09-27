// validationSchemas.js
import Joi from 'joi';

export const editWordSchema = Joi.object({
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

export const addWordSchema = Joi.object({
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

export const wordFormSchema = Joi.object({
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
