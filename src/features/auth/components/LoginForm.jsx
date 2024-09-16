import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import styles from '../../assets/styles/forms.module.css';
import authSchema from '../../../infrastructure/utils/authSchema';

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(authSchema),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const submitHandler = async data => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <label className={styles.field}>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p className={styles.validation_error}>{errors.email.message}</p>}
      </label>
      <label className={styles.field} style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          onClick={togglePasswordVisibility}
          className={styles.password_icon}
        />
        {errors.password && <p className={styles.validation_error}>{errors.password.message}</p>}
      </label>
      <button
        type="submit"
        className={`${styles.button} ${isValid ? styles.active_button : styles.inactive_button}`}
        disabled={!isValid}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
