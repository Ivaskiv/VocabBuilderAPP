import { useDispatch } from 'react-redux';
import AuthForm from './AuthForm.jsx';
import { register } from '../../redux/auth/authOperation.js';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const handleRegister = data => {
    dispatch(register(data));
  };
  return (
    <AuthForm
      title="Register"
      supportingText="To start using our services, please fill out the registration form below. All fields are mandatory:"
      fields={['name', 'email', 'password']}
      onSubmit={handleRegister}
      linkText="Login"
      linkPath="/login"
    />
  );
};

export default RegisterForm;
