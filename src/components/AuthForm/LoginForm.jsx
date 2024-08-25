import { useDispatch } from 'react-redux';
import AuthForm from './AuthForm.jsx';
import { login } from '../../redux/auth/authOperation.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleLogin = data => {
    dispatch(login(data));
  };
  return (
    <AuthForm
      title="Login"
      supportingText="Please enter your login details to continue using our service:"
      fields={['email', 'password']}
      onSubmit={handleLogin}
      linkText="Register"
      linkPath="/register"
    />
  );
};

export default LoginForm;
