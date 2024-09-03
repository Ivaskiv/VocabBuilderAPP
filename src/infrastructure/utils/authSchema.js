import * as Yup from 'yup';

const authSchema = formType => {
  return Yup.object().shape({
    name: formType === 'register' ? Yup.string().required('Name is required') : Yup.string(),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7,}$/,
        'Password must have 7+ chars and a number'
      )
      .required('Password is required'),
  });
};

export default authSchema;
