import css from './style.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthForm = ({ title, supportingText, fields, onSubmit, activeForm, setActiveForm }) => {
  const validationSchema = Yup.object().shape({
    name: fields.includes('name') ? Yup.string().required('Name is required') : Yup.string(),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
        'Password must be at least 7 characters long and contain at least one number'
      )
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={css.form_container}>
      <h2>{title}</h2>
      <p className={css.subtitle}>{supportingText}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.includes('name') && (
          <label className={css.field}>
            <input type="text" id="name" placeholder="Name" {...register('name')} />
            {errors.name && <p className={css.validation_error}>{errors.name.message}</p>}
          </label>
        )}
        <label className={css.field}>
          <input type="email" id="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={css.validation_error}>{errors.email.message}</p>}
        </label>
        <label className={css.field} style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            {...register('password')}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
          {errors.password && <p className={css.validation_error}>{errors.password.message}</p>}
        </label>
      </form>
      <div className={css.form_toggle}>
        <button
          className={`${css.button} ${
            activeForm === 'register' ? css.active_button : css.inactive_button
          }`}
          onClick={() => setActiveForm('register')}
        >
          Register
        </button>
        <button
          className={`${css.button} ${
            activeForm === 'login' ? css.active_button : css.inactive_button
          }`}
          onClick={() => setActiveForm('login')}
        >
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
